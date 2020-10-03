import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Client } from 'src/app/client/client';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DispatchService } from 'src/app/dispatch/dispatch.service';
import { Dispatch } from 'src/app/model/dispatch';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/client/clients.service';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  angForm: FormGroup;
  formVehicle: FormGroup;
  vehicles = [];
  vehiclesAdd = [];
  dispatch: Dispatch;

  constructor(private fb: FormBuilder,
              private fbVehicle: FormBuilder,
              private clientService: ClientsService,
              private dispatchService: DispatchService,
              private activatedRoute: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('XXXXXXXX');
      console.log(params);
    });

    this.createForm();
    this.vehicles = this.dispatchService.getVehicle();
  }

  createForm() {
    this.angForm = this.fb.group({
      nome: ['', Validators.required ],
      cpf: ['', Validators.required ],
      despachante: ['', Validators.required],
      indicacao: ['', Validators.required ],
      dtEntrada: ['', Validators.required ],
      dtEntradaOrg: [''],
      dtPronto: [''],
      dtEntrega: [''],
      obs: [''],
      vehicles: this.fb.array([])
    });

    this.formVehicle = this.fbVehicle.group({
      tipo:['', Validators.required],
      ano:['', Validators.required],
      modelo:['', Validators.required],
      cor:['', Validators.required],
      placa:['', Validators.required],
      renavam:['', Validators.required]
    });
  }
  // this.orderForm.get('items')
   addVehicles(){
     this.vehiclesAdd.push(this.formVehicle.value);
     this.formVehicle.reset();
   }

  findClient(cpf){
    this.clientService.findByCpf(cpf).subscribe((data: any[])=>{
        this.angForm.get('nome').setValue(data['nome']);
        this.angForm.get('despachante').enable();
        this.angForm.get('despachante').setValue(sessionStorage.getItem('username'));
    });
  }

  editVeicle(indexOfVehicle){
    this.formVehicle.setValue(this.vehiclesAdd[indexOfVehicle]);
    this.vehiclesAdd.splice(indexOfVehicle, 1);
  }

  deleteVeicle(indexOfVehicle){
    this.vehiclesAdd.splice(indexOfVehicle, 1);
  }

  save(){
    const control = <FormArray>this.angForm.get('vehicles');
    control.clear();
    this.vehiclesAdd.forEach(vehicle => {
      control.push(this.patchValues(vehicle))
    });
    this.dispatchService.save(this.angForm.value);
  }

  // assign the values
  patchValues(vehicle) {
    return this.fb.group({
      tipo: [vehicle.tipo],
      ano: [vehicle.ano],
      modelo: [vehicle.modelo],
      cor: [vehicle.cor],
      placa: [vehicle.placa],
      renavam: [vehicle.renavam]
    })    
  }
}