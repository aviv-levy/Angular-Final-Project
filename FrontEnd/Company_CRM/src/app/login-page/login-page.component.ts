import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';
import { User } from '../app.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  getFieldControl(fieldName: string): FormControl {
    return this.loginForm.get(fieldName) as FormControl;
  }

  constructor(
    private api: ApiService,
    private router: Router,
  ) {

  }

  onSubmit() {
    if (this.loginForm.invalid)
      return;

    this.api.login(this.loginForm.value).subscribe({
      next: (data: User) => {
        if (data.token) this.api.setToken(data.token)
        this.router.navigate(['/customers']);
      },
      error: (err) => console.log(err)
    })
  }
}
