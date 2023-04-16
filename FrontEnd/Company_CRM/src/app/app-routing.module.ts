import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CustomersPageComponent } from './customers/customers-page/customers-page.component';
import { EmployeesPageComponent } from './employees/employees-page/employees-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [AuthService] },
  {
    path: '',
    // redirectTo: '/home',
    // pathMatch: 'full',
    canActivateChild: [AuthService],
    children: [
      { path: 'customers', component: CustomersPageComponent },
      { path: 'employees', component: EmployeesPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
