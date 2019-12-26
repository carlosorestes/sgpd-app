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
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    console.log('AQUI ....');
    console.log(this.router.getCurrentNavigation());
  }

  createEmployee(): void {
    this.httpClientService.createUser(this.user)
        .subscribe( data => {
          alert("User created successfully.");
        });

  };

}
