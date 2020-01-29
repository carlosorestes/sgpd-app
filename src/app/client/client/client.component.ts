import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { ClientsService } from 'src/app/service/clients.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  

  angForm: FormGroup;
  constructor(private fb: FormBuilder, 
              private ps: ClientsService,
              private eventEmitterService: EventEmitterService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.angForm = this.fb.group({
      nome: ['', Validators.required ],
      cpf: ['', Validators.required ],
      telefone1: ['', Validators.required ],
      telefone2: ['']
    });
  }

  addClient(nome, cpf, telefone1, telefone2) {
    this.ps.addClient(nome, cpf, telefone1, telefone2);
    this.findAll();
  }

  findAll(){
    this.eventEmitterService.listAllClient();
  }


}
