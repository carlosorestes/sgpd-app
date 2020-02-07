import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/service/clients.service';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {

  client:Client;

  constructor(private clientService: ClientsService) { }

  ngOnInit() {
  }

  findClient(cpf){
    this.client = this.clientService.findByCpf(cpf);
  }

}
