import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/app.component';

@Component({
  selector: '[app-contact]',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @Input() contact: Contact = {};
  @Input() index: number = 0;
}
