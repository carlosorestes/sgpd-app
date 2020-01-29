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
    console.log('99999999999999999999999')
    this.invokeFindAllUserFromUser.emit();    
  }  

  listAllClient() {
    console.log('00000000000000000000000')
    this.invokeFindAllClientFromClient.emit(); 
  }
}
