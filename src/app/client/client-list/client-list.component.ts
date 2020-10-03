import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Client } from '../client';
import { Router, NavigationExtras } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { User } from 'src/app/model/user';
import { ClientsService } from '../clients.service';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  error$ = new Subject<boolean>();

  constructor(private clientsService: ClientsService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private alertService: AlertModalService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFindAllClientFromClient.subscribe((name: string) => {
          this.findAll();
        });
    }
    this.findAll();
  }

  findAll() {
    console.log('findAll');
    this.clientsService.getClients().subscribe(
      response => {
        this.handleSuccessfulResponse(response);
        this.cdr.markForCheck();
      },
    );

  }

  delete(client: Client): void {
    this.clientsService.delete(client)
      .subscribe(data => {
        this.clients = this.clients.filter(u => u !== client);
        this.alertService.showAlertSuccess('Cliente excluido com sucesso');
      },
        error => {
          this.alertService.showAlertDanger('Erro ao excluir Cliente');
        })
  };

  updateUser(user: User): void {
    let navigationExtras: NavigationExtras = {
      queryParams: user
    }

    this.router.navigate(['user'], navigationExtras);
  };

  handleSuccessfulResponse(response) {
    this.clients = response;
  }

}
