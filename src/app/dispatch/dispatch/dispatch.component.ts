import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { ClientsService } from 'src/app/service/clients.service';
import { Client } from 'src/app/client/client';
import { Vehicle } from 'src/app/model/vehicle.model';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  client: Client;
  vehicle: Vehicle;
  angForm: FormGroup;
  formVehicle: FormGroup;
  vehicles = [];
  vehiclesAdd = [];
  constructor(private fb: FormBuilder,
              private fbVehicle: FormBuilder,
              private clientService: ClientsService) { 
    
  }

  ngOnInit() {
    this.createForm();
    this.vehicles = this.getVehicle();
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
    console.log(this.angForm.value);
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

  getVehicle() {
    // fonte https://www.diariodasleis.com.br/
    return[
      { _id: '2', nome: 'Ciclomotor' },
      { _id: '3', nome: 'Motoneta' },
      { _id: '4', nome: 'Motocicleta' },
      { _id: '5', nome: 'Triciclo' },
      { _id: '6', nome: 'Automóvel' },
      { _id: '7', nome: 'Micro-Ônibus' },
      { _id: '8', nome: 'Ônibus' },
      { _id: '10', nome: 'Reboque' },
      { _id: '11', nome: 'Semirreboque' },
      { _id: '13', nome: 'Camioneta' },
      { _id: '14', nome: 'Caminhão' },
      { _id: '17', nome: 'Caminhão Trator' },
      { _id: '18', nome: 'Tr Rodas' },
      { _id: '19', nome: 'Tr Esteiras' },
      { _id: '20', nome: 'Tr Misto' },
      { _id: '21', nome: 'Quadriciclo' },
      { _id: '22', nome: 'Chassi Plataforma' },
      { _id: '23', nome: 'Caminhonete' },
      { _id: '25', nome: 'Utilitário' },
      { _id: '26', nome: 'Motor-Casa' },
    ]
  }

}