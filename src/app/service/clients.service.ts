import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  uri = 'http://localhost:8080/persons';

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
}
