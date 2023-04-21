import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContactsPageComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ContactsModule { }
