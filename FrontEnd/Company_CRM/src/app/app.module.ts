import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomersModule } from './customers/customers.module';
import { LoginModule } from './login-page/login.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ContactsModule } from './contacts/contacts.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomersModule,
    LoginModule,
    CoreModule,
    ContactsModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
