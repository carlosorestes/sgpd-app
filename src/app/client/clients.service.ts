import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { tap, delay, retry, catchError } from 'rxjs/operators';
import { Client } from './client';
import { AlertModalService } from '../shared/alert-modal.service';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly API = `${environment.API}persons`;

  uri = 'http://localhost:8080/persons';
  httpClient: any;

  constructor(private http: HttpClient,
    private alertService: AlertModalService) { }

  addClient(client: any) {
    this.http.post(this.API, client)
        .subscribe(res => this.alertService.showAlertSuccess('Cadastro Realizado com sucesso'));
  }

  getClients() {
    return this.http.get(this.API);
  }

  list() {
    return this.http.get<Client[]>(this.API)
      .pipe(
        delay(200),
        tap(console.log)
      )
  }

  delete(client) {
    return this.http.delete<Client>(this.API + "/"+ client.id);
  }

  findByCpf(cpf){
    return this.http.get<Client>(this.API + "/cpf" + "/"+ cpf);
  }

  getPageable(pageNumber: number, 
              pageSize: number): Observable<Message>{

                // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    return this.http.get<Message>(this.API + `/pageable`, { params: params })
                  .pipe(
                    retry(3),
                    catchError(this.handleError)
                  );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
