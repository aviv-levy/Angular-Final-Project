import { Component, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './core/api.service';
import { AuthService } from './core/auth.service';

export interface User {
  email?: string | null;
  password?: string | null;
  token?: string | null;
}

export interface Customer {
  _id?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phone?: string | null,
  email?: string | null,
  address?: string | null,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  email?: string | null = '';
  title = 'Company_CRM';


  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
  ) {
  }


  ngAfterViewChecked() {
    if (this.email === '' && this.loggedIn())
      this.getEmail();
  }

  // Get email user from server by token
  getEmail() {
    this.api.getEmailDetails(this.api.getToken()).subscribe({
      next: (data: any) => {
        this.email = data.email
      },
      error: (err) => {
        if (err.status === 403) //If token expired, do force logout
          this.logout();
        console.log(err)
      }
    })
  }

  loggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.api.deleteToken();
    this.email = '';
    this.router.navigate(['login']);
  }
}
