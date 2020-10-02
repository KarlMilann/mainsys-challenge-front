import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {UserSalesComponent} from './components/user-sales/user-sales.component';
import {BoardComponent} from './components/board/board.component';
import {RegisterComponent} from './components/auth/register/register.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'my-sales', component: UserSalesComponent},
  {path: 'board', component: BoardComponent},
  {path: 'signup', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
