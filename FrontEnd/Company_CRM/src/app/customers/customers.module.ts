import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrFieldModule } from '../shared/err-field/err-field.module';
import { CustomerComponent } from './customer/customer.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    CustomersPageComponent,
    CustomerComponent,
    EditPageComponent,
    ViewPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ErrFieldModule
  ]
})
export class CustomersModule { }
