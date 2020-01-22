import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { User } from '../model/user';
import { Router, NavigationExtras } from '@angular/router';
import { EventEmitterService } from '../service/event-emitter.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:User[];

  constructor(private httpClientService:HttpClientService,
    private router: Router,
    private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFindAllUserFromUser.subscribe((name:string) => {    
        this.findAllUsers();    
      });    
    }
    this.findAllUsers();  
  }

  findAllUsers(){
    this.httpClientService.getUsers().subscribe(
      response =>this.handleSuccessfulResponse(response),
     );
  }

  deleteUser(user: User): void {
    this.httpClientService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  updateUser(user: User): void {
    let navigationExtras: NavigationExtras = {
      queryParams: user
    }

    this.router.navigate(['user'], navigationExtras);
  };

  handleSuccessfulResponse(response)
{
    this.users=response;
    console.log( this.users);
}


}
