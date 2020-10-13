import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { AlertModalService } from '../shared/alert-modal.service';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient,
    private alertService: AlertModalService) { }

  getUsers() {
    console.log('GET All Users');
    return this.httpClient.get<User[]>('http://localhost:8080/users/');
  }

  public deleteUser(user) {
    return this.httpClient.delete<User>("http://localhost:8080/users" + "/" + user.id);
  }

  public createUser(user) {
    return this.httpClient.post<User>("http://localhost:8080/users/", user);
  }

  public updateUser(user) {
    console.log('PUT User');
    return this.httpClient.put<User>("http://localhost:8080/users/", user);
  }
}
