import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  formVeicle: FormGroup;
  vehicles = [];
  vehiclesAdd = [];
  constructor(private fb: FormBuilder,
              private fbVehicle: FormBuilder,
              private clientService: ClientsService) { 
    this.createForm();
    this.vehicles = this.getVehicle();
  }

  ngOnInit() {
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
      obs: ['']
    });

    this.formVeicle = this.fbVehicle.group({
      tipo:[''],
      ano:[''],
      modelo:[''],
      cor:[''],
      placa:[''],
      renavam:['']
    });
  }

   addVehicles(){
     this.vehiclesAdd.push(this.formVeicle.value);
     this.formVeicle.reset();
   }

  findClient(cpf){
    this.clientService.findByCpf(cpf).subscribe((data: any[])=>{
        this.angForm.get('nome').setValue(data['nome']);
        this.angForm.get('despachante').enable();
        this.angForm.get('despachante').setValue(sessionStorage.getItem('usernome'));
    });
  }

  editVehicle(){
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