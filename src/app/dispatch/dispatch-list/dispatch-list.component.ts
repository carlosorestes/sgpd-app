import { Component, OnInit } from '@angular/core';
import { DispatchService } from 'src/app/dispatch/dispatch.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dispatch } from 'src/app/model/dispatch';
import { Client } from 'src/app/client/client';
import { User } from 'src/app/model/user';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { HttpClientService } from 'src/app/add-user/http-client.service';

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
              private userService: HttpClientService,
              private alertService: AlertModalService,
              private router: Router) { }

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
        this.alertService.showAlertSuccess('Cadastro Realizado com sucesso');
        this.error$.next(true);
        return empty();
      })
    );

    // carregar dados por pequisa do Usuario
    this.userService.getUsers().subscribe(dados => this.clients = dados);

    // carregar dados tipos de veiculos
    this.vehicles = this.dispatchService.getVehicle();
  }

  update(dispatch: Dispatch): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        dispatch_id: dispatch.id,
      },
      skipLocationChange: true
    }

    this.router.navigate(['dispatch'], navigationExtras);
  };

}
