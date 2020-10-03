import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../service/products.service';
import { ClientsService } from './clients.service';
import { ClientListComponent } from './client-list/client-list.component';
import { EventEmitterService } from '../service/event-emitter.service';
import { BasicAuthHtppInterceptorServiceService } from '../service/basic-auth-htpp-interceptor-service.service';

@NgModule({
  declarations: [
    ClientComponent, 
    ClientListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService,
    ClientsService,
    EventEmitterService,
    { provide:HTTP_INTERCEPTORS, 
      useClass:BasicAuthHtppInterceptorServiceService, 
      multi:true
   }
  ]
})
export class ClientModule { }
