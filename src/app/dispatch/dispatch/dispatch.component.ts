import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Vehicle } from 'src/app/model/vehicle.model';
import { DispatchService } from 'src/app/dispatch/dispatch.service';
import { Dispatch } from 'src/app/model/dispatch';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/client/clients.service';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css'],
  providers: [DatePipe]
})
export class DispatchComponent implements OnInit {

  angForm: FormGroup;
  formVehicle: FormGroup;
  vehicles = [];
  vehiclesAdd = [];
  dispatch: Dispatch;
  nowDate = new Date();

  constructor(private fb: FormBuilder,
    private fbVehicle: FormBuilder,
    private clientService: ClientsService,
    private dispatchService: DispatchService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe) {
    this.createForm();
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams['dispatch_id']) {
      this.activatedRoute.queryParams
        .subscribe(params => {
          this.dispatchService.getById(params['dispatch_id']).subscribe(response => {
            this.angForm.patchValue({
              id: response['id'],
              nome: response['person']['nome'],
              cpf: response['person']['cpf'],
              despachante: response['user']['nome'],
              indicacao: response['recommendation'],
              dtEntrada: formatDate(response['dataCriacao'], 'yyyy-MM-dd', 'en-US'),
              dtEntradaOrg: formatDate(response['dataEntradaOrgao'], 'yyyy-MM-dd', 'en-US'),
              dtPronto: formatDate(response['dataPronto'], 'yyyy-MM-dd', 'en-US'),
              dtEntrega: formatDate(response['dataEntrega'], 'yyyy-MM-dd', 'en-US'),
              obs: response['note'],
            });
            this.buildFormVehicle(response['listOrderVehicle']);
          });
        });
    }
  }

  createForm() {
    this.angForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      despachante: ['', Validators.required],
      indicacao: ['', Validators.required],
      dtEntrada: [this.datePipe.transform(this.nowDate, 'yyyy-MM-dd'), Validators.required],
      dtEntradaOrg: [''],
      dtPronto: [''],
      dtEntrega: [''],
      obs: [''],
      vehicles: this.fb.array([])
    });

    this.formVehicle = this.fbVehicle.group({
      tipoVeiculo: ['', Validators.required],
      ano: ['', Validators.required],
      modelo: ['', Validators.required],
      cor: ['', Validators.required],
      placa: ['', Validators.required],
      renavam: ['', Validators.required],
      status: []
    });

    this.vehicles = this.dispatchService.getVehicle();
  }

  addVehicles() {
    this.vehiclesAdd.push(this.formVehicle.value);
    this.formVehicle.reset();
  }

  findClient(cpf) {
    this.clientService.findByCpf(cpf.replace(/[.,-]/g, '')).subscribe((data: any[]) => {
      this.angForm.get('nome').setValue(data['nome']);
      this.angForm.get('despachante').enable();
      this.angForm.get('despachante').setValue(sessionStorage.getItem('username'));
    });
  }

  editVeicle(indexOfVehicle) {
    this.formVehicle.setValue(this.vehiclesAdd[indexOfVehicle]);
    this.vehiclesAdd.splice(indexOfVehicle, 1);
  }

  deleteVeicle(indexOfVehicle) {
    this.vehiclesAdd.splice(indexOfVehicle, 1);
  }

  save() {
    const control = <FormArray>this.angForm.get('vehicles');
    control.clear();
    this.vehiclesAdd.forEach(vehicle => {
      control.push(this.patchValues(vehicle))
    });
    this.dispatchService.save(this.angForm.value);
  }

  buildFormVehicle(listOrderVehicle) {
    listOrderVehicle.forEach(orderVehicle => {
      let vehicle: Vehicle = {
        _id: orderVehicle['vehicle']['id'],
        tipoVeiculo: orderVehicle['vehicle']['tipoVeiculo'],
        ano: orderVehicle['vehicle']['ano'],
        modelo: orderVehicle['vehicle']['modelo'],
        cor: orderVehicle['vehicle']['cor'],
        placa: orderVehicle['vehicle']['placa'],
        renavam: orderVehicle['vehicle']['renavam'],
        status: orderVehicle['status']
      }
      this.vehiclesAdd.push(vehicle)
    });
  }

  // assign the values
  patchValues(vehicle) {
    return this.fb.group({
      tipoVeiculo: [vehicle.tipoVeiculo],
      ano: [vehicle.ano],
      modelo: [vehicle.modelo],
      cor: [vehicle.cor],
      placa: [vehicle.placa],
      renavam: [vehicle.renavam],
      status: [vehicle.status]
    })
  }
}