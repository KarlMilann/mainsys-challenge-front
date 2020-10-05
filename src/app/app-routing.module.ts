import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {UserSalesComponent} from './components/sales/user-sales/user-sales.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {AuthLoginGuardService} from './services/authentication/auth-login-guard.service';
import {AuthGuardService} from './services/authentication/auth-guard.service';
import {BoardComponent} from './components/sales/board/board.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'my-sales', component: UserSalesComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'board', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthLoginGuardService]
})

export class AppRoutingModule {

}
