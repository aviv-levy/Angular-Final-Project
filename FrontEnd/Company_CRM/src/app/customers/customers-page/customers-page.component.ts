import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.scss']
})
export class CustomersPageComponent implements OnInit {

  customers: Array<Customer> = [];

  addCustomerForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.minLength(3)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.minLength(2)]
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    })
  })

  constructor(
    private api: ApiService
  ) { }

  getFieldControl(fieldName: string): FormControl {
    return this.addCustomerForm.get(fieldName) as FormControl;
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.api.getCustomers().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      }
    })
  }

  onSubmit() {
    if (this.addCustomerForm.invalid)
      return;

    this.api.addCustomer(this.addCustomerForm.value).subscribe({
      next: (data: Customer) => {
        this.addCustomerForm.reset();
        this.getCustomers();
      },
      error: err => console.log(err)
    })
  }

}
