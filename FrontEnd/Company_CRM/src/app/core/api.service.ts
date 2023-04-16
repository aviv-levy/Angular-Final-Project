import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, User } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl = 'http://localhost:3000/';

  // private token = ''
  private TOKEN_KEY = 'token'

  setToken(value: string) {
    localStorage.setItem(this.TOKEN_KEY, value);
    // this.token = value;
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY) || '';
  }

  deleteToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  constructor(private http: HttpClient) { }

  login<User>(user: User): Observable<User> {
    return this.http.post<User>(
      this.serverUrl + 'login', user,
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  getEmailDetails(token: string): Observable<string> {
    return this.http.get<string>(
      this.serverUrl + `getDetails/getEmail/${token}`,
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      this.serverUrl + 'customers/addCustomer', customer,
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(
      this.serverUrl + 'customers',
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

}
