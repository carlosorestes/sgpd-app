import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { Client } from './client';
import { AlertModalService } from '../shared/alert-modal.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly API = `${environment.API}persons`;

  uri = 'http://localhost:8080/persons';
  httpClient: any;

  constructor(private http: HttpClient,
    private alertService: AlertModalService) { }

  addClient(nome, cpf, telefone1, telefone2) {
    const obj = {
      nome,
      cpf,
      telefone1,
      telefone2
    };
    this.http.post(`${this.uri}`, obj)
        .subscribe(res => this.alertService.showAlertSuccess('Cadastro Realizado com sucesso'));
  }

  getClients() {
    console.log('Call Service to call Clients .....');
    return this.http.get(`${this.uri}`);
  }

  list() {
    return this.http.get<Client[]>(this.API)
      .pipe(
        delay(200),
        tap(console.log)
      )
  }

  delete(client) {
    console.log('DEL Client');
    return this.http.delete<Client>(`${this.uri}` + "/"+ client.id);
  }

  findByCpf(cpf){
    return this.http.get<Client>(`${this.uri + "/cpf" + "/"+ cpf}`);
  }

}
