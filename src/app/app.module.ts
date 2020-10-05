import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './components/pagination/header/header.component';
import { FooterComponent } from './components/pagination/footer/footer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { TabComponentComponent } from './components/pagination/tab-component/tab-component.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './components/auth/login/login.component';
import { UserSalesComponent } from './components/sales/user-sales/user-sales.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './components/auth/register/register.component';
import {httpInterceptorProviders} from './components/auth/AuthInterceptor';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { CreateSaleComponent } from './components/sales/create-sale/create-sale.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteSaleComponent } from './components/sales/delete-sale/delete-sale.component';
import {MatDividerModule} from '@angular/material/divider';
import { BoardComponent } from './components/sales/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TabComponentComponent,
    LoginComponent,
    UserSalesComponent,
    RegisterComponent,
    CreateSaleComponent,
    DeleteSaleComponent,
    BoardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    NgbModule,
    MatCardModule,
    MatDividerModule,


  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
