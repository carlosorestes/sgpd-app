import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router, NavigationExtras } from '@angular/router';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { User } from 'src/app/model/user';
import { ClientsService } from 'src/app/service/clients.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients:Client[];

  constructor(private clientsService:ClientsService,
    private router: Router,
    private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFindAllClientFromClient.subscribe((name:string) => {    
        this.findAll();
      });    
    }
    this.findAll();  
  }

  findAll(){
    this.clientsService.getClients().subscribe(
      response =>this.handleSuccessfulResponse(response),
     );
  }

  delete(client: Client): void {
    this.clientsService.delete(client)
      .subscribe( data => {
        this.clients = this.clients.filter(u => u !== client);
      })
  };

  // updateUser(user: User): void {
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: user
  //   }

  //   this.router.navigate(['user'], navigationExtras);
  // };

  handleSuccessfulResponse(response)
{
    this.clients=response;
    console.log( this.clients);
}

}
