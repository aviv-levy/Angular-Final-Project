import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersPageComponent } from './customers-page/customers-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrFieldModule } from '../shared/err-field/err-field.module';
import { CustomerComponent } from './customer/customer.component';



@NgModule({
  declarations: [
    CustomersPageComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrFieldModule
  ]
})
export class CustomersModule { }
