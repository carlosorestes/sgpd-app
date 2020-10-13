import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { ClientComponent } from './client/client/client.component';
import { DispatchComponent } from './dispatch/dispatch/dispatch.component';
import { DispatchListComponent } from './dispatch/dispatch-list/dispatch-list.component';

const routes: Routes = [
  { path:'', component: UserComponent, canActivate:[AuthGaurdService]},
  { path:'user', component: UserComponent, canActivate:[AuthGaurdService]},
  { path:'client', component: ClientComponent, canActivate:[AuthGaurdService]},
  { path:'dispatch', component: DispatchComponent, canActivate:[AuthGaurdService]},
  { path:'app-dispatch-list', component: DispatchListComponent, canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
