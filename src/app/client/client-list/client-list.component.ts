import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Client } from '../client';
import { Router, NavigationExtras } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { User } from 'src/app/model/user';
import { ClientsService } from '../clients.service';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Message } from '../message';

const pageSize:number = 4;

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  error$ = new Subject<boolean>();

  currentSelectedPage:number = 0;
  totalPages: number = 0;
  customers: Array<Client> = [];
  pageIndexes: Array<number> = [];


  constructor(private clientsService: ClientsService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private alertService: AlertModalService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFindAllClientFromClient.subscribe((name: string) => {
          // this.findAll();
          this.getPage(0);
        });
    }
    // this.findAll();
    this.getPage(0);
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

  update(client: Client): void {
    let navigationExtras: NavigationExtras = {
      queryParams: client,
      skipLocationChange: true
    }
    this.router.navigate(['client'], navigationExtras);
  };

  handleSuccessfulResponse(response) {
    this.clients = response;
  }

  getPage(page: number){
    this.clientsService.getPageable(page, pageSize)
            .subscribe(
                (message: Message) => {
                  this.clients = message['persons'];
                  this.totalPages = message.totalPages;
                  this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
                  this.currentSelectedPage = message.pageNumber;
                },
                (error) => {
                  console.log(error);
                }
            );
  }

  nextClick(){
    if(this.currentSelectedPage < this.totalPages-1){
      this.getPage(++this.currentSelectedPage);
    }  
  }

  previousClick(){
    if(this.currentSelectedPage > 0){
      this.getPage(--this.currentSelectedPage);
    }  
  }

  getPaginationWithIndex(index: number) {
    this.getPage(index);
  }

  active(index: number) {
    if(this.currentSelectedPage == index ){
      return {
        active: true
      };
    }
  }

}
