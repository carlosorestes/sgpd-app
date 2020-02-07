import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  uri = 'http://localhost:8080/persons';
  httpClient: any;

  constructor(private http: HttpClient) { }

  addClient(nome, cpf, telefone1, telefone2) {
    const obj = {
      nome,
      cpf,
      telefone1,
      telefone2
    };
    console.log(obj);
    this.http.post(`${this.uri}`, obj)
        .subscribe(res => console.log('Done'));
  }

  getClients() {
    return this.http.get(`${this.uri}`);
  }

  delete(client) {
    console.log('DEL Client');
    return this.http.delete<Client>("http://localhost:8080/persons" + "/"+ client.id);
  }

  findByCpf(cpf){
    console.log('FindByCpf Client');
    return this.http.get<Client>("http://localhost:8080/persons" + "/"+ cpf);
  }

}
