import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrFieldComponent } from './err-field.component';



@NgModule({
  declarations: [
    ErrFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrFieldComponent
  ]
})
export class ErrFieldModule { }
