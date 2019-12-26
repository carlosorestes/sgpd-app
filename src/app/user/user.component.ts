import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:User[];

  constructor(private httpClientService:HttpClientService,
    private router: Router) { }

  ngOnInit() {
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
    this.router.navigate(['user'], {state: {data:{user}}});
  };

  handleSuccessfulResponse(response)
{
    this.users=response;
    console.log( this.users);
}


}
