import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ClientsService } from 'src/app/service/clients.service';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  client:Client;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,
              private clientService: ClientsService) { 
    this.createForm();
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
  }

  findClient(cpf){
    this.client = this.clientService.findByCpf(cpf).subscribe((data: any[])=>{
        this.angForm.get('nome').setValue(data['nome']);
        this.angForm.get('despachante').enable();
        this.angForm.get('despachante').setValue(sessionStorage.getItem('username'));
    });
  }

}
