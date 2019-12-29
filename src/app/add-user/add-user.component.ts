import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = new User("","","","","");

  constructor(private httpClientService: HttpClientService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { 
    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        this.user['id'] = params['id']
        this.user['nome'] = params['nome'];
        this.user['phone'] = params['phone'];
        this.user['password'] = params['password'];
      });
  }

  saveEmployee(): void {

    if (this.user['id']){
      this.httpClientService.updateUser(this.user)
          .subscribe (data => {
            alert("User created successfully.");
          });
    } else {
      this.httpClientService.createUser(this.user)
        .subscribe( data => {
          alert("User created successfully.");
        });
    }

  };

}
