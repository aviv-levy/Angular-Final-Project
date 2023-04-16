import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrFieldModule } from '../shared/err-field/err-field.module';



@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrFieldModule
  ],
  exports:[
    LoginPageComponent
  ]
})
export class LoginModule { }
