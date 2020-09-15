import { Component, OnInit } from '@angular/core';
import { DispatchService } from 'src/app/service/dispatch.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dispatch } from 'src/app/model/dispatch';
import { Client } from 'src/app/client/client';
import { User } from 'src/app/model/user';
import { ClientsService } from 'src/app/service/clients.service';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dispatch-list',
  templateUrl: './dispatch-list.component.html',
  styleUrls: ['./dispatch-list.component.css'],
  preserveWhitespaces: true
})
export class DispatchListComponent implements OnInit {

  angForm: FormGroup;
  clients: Client[];
  user: User;
  vehicles = [];

  dispatchs$: Observable<Dispatch[]>;
  error$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private dispatchService: DispatchService,
              private userService: HttpClientService) { }

  ngOnInit() {
    this.loadingData();
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      despachante: [''],
      indicacao: [''],
      dtEntradaInicio: [''],
      dtEntradaFim: [''],
      dtEntrada: [''],
      dtEntregaInicio: [''],
      dtEntregaFim: [''],
      tipo: [''],
      ano: [''],
      modelo: [''],
      cor: [''],
      placa: [''],
      renavam: ['']
    });
  }

  loadingData(){
    // carregar dados da tabela de pesquisa Opcao para subscribe
    // this.dispatchService.list().subscribe(
    //   dados => {
    //     console.log(dados);
    //   },
    //   error => {
    //     console.log(error)
    //   },
    //   () => console.log('Observable Complete')
    // );

    // carregar dados da tabela de pesquisa no modo Observable para economia de memoria
    this.dispatchs$ = this.dispatchService.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );

    // carregar dados por pequisa do Usuario
    this.userService.getUsers().subscribe(dados => this.clients = dados);

    // carregar dados tipos de veiculos
    this.vehicles = this.dispatchService.getVehicle();
  }

}
