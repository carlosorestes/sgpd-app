import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchComponent } from './dispatch/dispatch.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DispatchListComponent } from './dispatch-list/dispatch-list.component';
import { UtilsModule } from '../utils/main-pipe/utils.module';
import { DispatchService } from './dispatch.service';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DispatchComponent, DispatchListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule
  ],providers: [
    DispatchService
  ]
})
export class DispatchModule { }
