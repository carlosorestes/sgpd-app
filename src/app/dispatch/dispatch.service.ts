import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Dispatch } from '../model/dispatch';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { AlertModalService } from '../shared/alert-modal.service';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  private readonly API = `${environment.API}orders`;

  bsModalRef: BsModalRef

  constructor(private httpClient:HttpClient,
              private router:Router,
              private alertService: AlertModalService) { }

  save(dispacher) {
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

  getById(id){
    return this.httpClient.get<Dispatch>(this.API + '/' + id)
    .pipe(
      delay(200),
      tap(console.log)
    );
  }

  getVehicle() {
    // fonte https://www.diariodasleis.com.br/
    return[
      { _id: 'CICLOMOTOR', nome: 'Ciclomotor' },
      { _id: 'MOTONETA', nome: 'Motoneta' },
      { _id: 'MOTOCICLETA', nome: 'Motocicleta' },
      { _id: 'TRICICLO', nome: 'Triciclo' },
      { _id: 'AUTOMOVEL', nome: 'Automóvel' },
      { _id: 'MICROONIBUS', nome: 'Micro-Ônibus' },
      { _id: 'ONIBUS', nome: 'Ônibus' },
      { _id: 'REBOQUE', nome: 'Reboque' },
      { _id: 'SEMIRREBOQUE', nome: 'Semirreboque' },
      { _id: 'CAMIONETA', nome: 'Camioneta' },
      { _id: 'CAMINHAO', nome: 'Caminhão' },
      { _id: 'CAMINHAOTRATOR', nome: 'Caminhão Trator' },
      { _id: 'TRRODAS', nome: 'Tr Rodas' },
      { _id: 'TRESTEIRAS', nome: 'Tr Esteiras' },
      { _id: 'TRMISTO', nome: 'Tr Misto' },
      { _id: 'QUADRICICLO', nome: 'Quadriciclo' },
      { _id: 'CHASSIPLATAFORMA', nome: 'Chassi Plataforma' },
      { _id: 'CAMINHONETE', nome: 'Caminhonete' },
      { _id: 'UTILITARIO', nome: 'Utilitário' },
      { _id: 'MOTORCASA', nome: 'Motor-Casa' },
    ]
  }
}
