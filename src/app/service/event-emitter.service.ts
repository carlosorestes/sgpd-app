import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFindAllUserFromUser = new EventEmitter();  
  invokeFindAllClientFromClient = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  listAllUser() {
    this.invokeFindAllUserFromUser.emit();    
  }  

  listAllClient() {
    this.invokeFindAllClientFromClient.emit(); 
  }
}
