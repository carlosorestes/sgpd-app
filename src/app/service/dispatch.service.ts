import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Dispatch } from '../model/dispatch';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  private readonly API = `${environment.API}orders`;

  constructor(private httpClient:HttpClient,
              private router:Router) { }

  save(dispacher) {
    console.log(dispacher);
    // return this.httpClient.post<Dispatch>(this.API, dispacher);
    
    this.httpClient.post(this.API, dispacher)
        .subscribe(res => this.router.navigate(['/app-dispatch-list']));
  }

  list() {
    return this.httpClient.get<Dispatch[]>(this.API)
      .pipe(
        delay(200),
        tap(console.log)
      )
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
