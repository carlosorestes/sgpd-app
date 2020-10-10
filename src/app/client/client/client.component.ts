import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { ClientsService } from '../clients.service';
import { Client } from '../client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  

  angForm: FormGroup;
  client: Client;
  constructor(private fb: FormBuilder, 
              private clientService: ClientsService,
              private eventEmitterService: EventEmitterService,
              private activatedRoute: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {

         this.angForm.patchValue({id: params['id'], 
                                  nome: params['nome'],
                                  cpf: params['cpf'],
                                  telefone1: params['telefone1'],
                                  telefone2: params['telefone2'],
                                });
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required ],
      cpf: ['', Validators.required ],
      telefone1: ['', Validators.required ],
      telefone2: ['']
    });
  }

  addClient() {
    const obj = {
      id: this.angForm.value['id'],
      nome: this.angForm.value['nome'],
      cpf: this.angForm.value['cpf'],
      telefone1: this.angForm.value['telefone1'],
      telefone2: this.angForm.value['telefone2']
    };
    this.clientService.addClient(obj);
    this.resetar();
    this.findAll();
  }

  findAll(){
    this.eventEmitterService.listAllClient();
  }

  resetar(){
    this.angForm.reset();
  }


}
