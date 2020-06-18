import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispatchComponent } from './dispatch/dispatch.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DispatchListComponent } from './dispatch-list/dispatch-list.component';
import { UtilsModule } from '../utils/main-pipe/utils.module';
import { DispatchService } from '../service/dispatch.service';

@NgModule({
  declarations: [DispatchComponent, DispatchListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule
  ],providers: [
    DispatchService
  ]
})
export class DispatchModule { }
