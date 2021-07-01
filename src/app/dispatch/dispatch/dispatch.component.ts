import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Vehicle } from 'src/app/model/vehicle.model';
import { DispatchService } from 'src/app/dispatch/dispatch.service';
import { Dispatch } from 'src/app/model/dispatch';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/client/clients.service';
import { formatDate, DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddComplementVehicleModalComponent } from '../add-complement-vehicle-modal/add-complement-vehicle-modal.component';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css'],
  providers: [DatePipe]
})
export class DispatchComponent implements OnInit {

  angForm: FormGroup;
  modalRef: BsModalRef;
  formVehicle: FormGroup;
  formComplementVehicle: FormGroup;
  vehicles = [];
  vehiclesAdd = [];
  vehiclesDel = [];
  vehiclesComplement = [];
  dispatch: Dispatch;
  nowDate = new Date();
  model: NgbDateStruct;
  valorTotal = 0;

  constructor(private fb: FormBuilder,
    private fbVehicle: FormBuilder,
    private fbcomplement: FormBuilder,
    private clientService: ClientsService,
    private dispatchService: DispatchService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private modalService: BsModalService) {
    this.createForm();
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams['dispatch_id']) {
      this.activatedRoute.queryParams
        .subscribe(params => {
          if (params['dispatch_id']) {
            this.dispatchService.getById(params['dispatch_id']).subscribe(response => {
              this.angForm.patchValue({
                id: response['id'],
                nome: response['person']['nome'],
                cpf: response['person']['cpf'],
                despachante: response['user']['nome'],
                indicacao: response['recommendation'],
                dtEntrada: formatDate(response['dataCriacao'], 'dd-MM-yyyy', 'pt-BR'),
                dtEntradaOrg: response['dataEntradaOrgao'] != null ? formatDate(response['dataEntradaOrgao'], 'dd-MM-yyyy', 'pt-BR') : null,
                dtPronto: response['dataPronto'] != null ? formatDate(response['dataPronto'], 'dd-MM-yyyy', 'pt-BR') : null,
                dtEntrega: response['dataEntrega'] != null ? formatDate(response['dataEntrega'], 'dd-MM-yyyy', 'pt-BR') : null,
                obs: response['note'],
              });
              this.buildFormVehicle(response['listOrderVehicle']);
            });
          } else {
            this.createForm();
          }
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
      dtEntrada: [this.nowDate, Validators.required],
      dtEntradaOrg: [''],
      dtPronto: [''],
      dtEntrega: [''],
      obs: [''],
      valorTotal: [this.valorTotal],
      vehicles: this.fb.array([]),
      vehiclesDel: []
    });

    this.formVehicle = this.fbVehicle.group({
      _id: [''],
      tipoVeiculo: ['', Validators.required],
      ano: ['', Validators.required],
      modelo: ['', Validators.required],
      cor: ['', Validators.required],
      placa: ['', Validators.required],
      renavam: ['', Validators.required],
      status: [],
      valor: []
    });

    this.formComplementVehicle = this.fbcomplement.group({
      dtInput: ['', Validators.required],
      renavam: ['', Validators.required],
      obs: ['']
    });

    this.vehicles = this.dispatchService.getVehicle();

    this.vehiclesAdd = [];
  }

  addVehicles() {
    this.valorTotal = this.valorTotal + this.formVehicle.value.valor;
    this.angForm.get('valorTotal').setValue(this.valorTotal);
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

    if (this.vehiclesAdd[indexOfVehicle]._id.length != 0) {
      this.vehiclesDel.push(this.vehiclesAdd[indexOfVehicle]._id);
    }
    this.vehiclesAdd.splice(indexOfVehicle, 1);
  }

  save() {
    const vehicles = <FormArray>this.angForm.get('vehicles');

    vehicles.clear();

    this.vehiclesAdd.forEach(vehicle => {
      vehicles.push(this.patchValues(vehicle))
    });

    this.angForm.patchValue({
      vehiclesDel: this.vehiclesDel
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

  cancel() {
    this.createForm();
  }

  addComplement(vehicle){
    const initialState = {
      renavam: [vehicle.renavam]
    }
    this.modalRef = this.modalService.show(AddComplementVehicleModalComponent, {initialState});
    this.modalRef.content.closeBtnName = 'Close'; 

    this.modalRef.content.event.subscribe(res => {
      
      this.formComplementVehicle.patchValue({
        dtInput: formatDate(this.nowDate, 'dd-MM-yyyy HH:mm:ss', 'pt-BR'),
        renavam: res.data.renavam[0],
        obs: res.data.obs
      })

      this.vehiclesComplement.push(this.formComplementVehicle.value);
      
    });

  }
}