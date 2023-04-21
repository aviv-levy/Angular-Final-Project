import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/app.component';
import { ApiService } from 'src/app/core/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  customer: Customer = {};

  customerId = '';

  editCustomerForm = new FormGroup({
    firstName: new FormControl(this.customer.firstName, {
      validators: [Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.minLength(3)]
    }),
    lastName: new FormControl(this.customer.lastName, {
      validators: [Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.minLength(2)]
    }),
    phone: new FormControl(this.customer.phone, {
      validators: [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]
    }),
    email: new FormControl(this.customer.email, {
      validators: [Validators.required, Validators.email]
    }),
    address: new FormControl(this.customer.address)
  })

  getFieldControl(fieldName: string): FormControl {
    return this.editCustomerForm.get(fieldName) as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.customerId = params['id'])
    this.getCustomerDetails();

  }

  getCustomerDetails() {
    this.api.getCustomerDetails(this.customerId).subscribe({
      next: (data: Customer) => {
        this.customer = data;

        this.editCustomerForm.setValue({
          firstName: this.customer.firstName,
          lastName: this.customer.lastName,
          phone: this.customer.phone,
          email: this.customer.email,
          address: this.customer.address
        })
      },
      error: err => console.log(err)
    });
  }

  onSubmit() {
    if (this.editCustomerForm.invalid)
      return;

    if(this.editCustomerForm.value.address === undefined)
      this.editCustomerForm.value.address = '';

    this.api.updateCustomer(this.editCustomerForm.value, this.customerId).subscribe({
      next: (data: Customer) => {
        Swal.fire(
          'Good job!',
          'Customer information have been updated',
          'success'
        )
        this.getCustomerDetails();
      },
      error: err => console.log(err)
    });
  }

  onCancel(){
    this.router.navigate(['customers'])
  }

}
