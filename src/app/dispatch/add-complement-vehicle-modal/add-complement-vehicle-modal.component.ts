import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-complement-vehicle-modal',
  templateUrl: './add-complement-vehicle-modal.component.html',
  styleUrls: ['./add-complement-vehicle-modal.component.css']
})
export class AddComplementVehicleModalComponent implements OnInit {
  complementform;
  numberOfItems = 0;
  renavam = '';
  public event: EventEmitter<any> = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef) {
    this.complementform = this.formBuilder.group({
      obs: ""
      })
   }

  ngOnInit() {
  }

  addComplement(form){
    this.triggerEvent(form.value.obs);
    this.bsModalRef.hide();
  }

  triggerEvent(obs: string) {
    this.event.emit({ data: {
                        renavam: this.renavam,
                        obs: obs
                      }
    });
  }

  close(){
    this.bsModalRef.hide();
  }

}
