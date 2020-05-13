import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BasicAuthHtppInterceptorServiceService } from './service/basic-auth-htpp-interceptor-service.service';
import { EventEmitterService } from './service/event-emitter.service';
import { ClientModule } from './client/client.module';
import { ClientListComponent } from './client/client-list/client-list.component';
import { DispatchModule } from './dispatch/dispatch.module';
import { VehicleComponent } from './vehicle/vehicle.component';
import { UtilsModule } from './utils/main-pipe/utils.module';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClientModule,
    DispatchModule,
    UtilsModule
  ],
  providers: [
    EventEmitterService,
    { provide:HTTP_INTERCEPTORS, 
      useClass:BasicAuthHtppInterceptorServiceService, 
      multi:true
   }],
   exports: [
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
