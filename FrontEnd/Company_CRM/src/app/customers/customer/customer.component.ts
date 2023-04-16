import { Component, Input } from '@angular/core';
import { Customer } from 'src/app/app.component';

@Component({
  selector: '[app-customer]',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  @Input() customer: Customer = {};
  @Input() index: number = 0;
}
