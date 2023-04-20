import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CustomersPageComponent } from './customers/customers-page/customers-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContactsPageComponent } from './contacts/contacts-page/contacts-page.component';
import { EditPageComponent } from './customers/edit-page/edit-page.component';
import { ViewPageComponent } from './customers/view-page/view-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [AuthService] },
  {
    path: '',
    // redirectTo: '/home',
    // pathMatch: 'full',
    canActivateChild: [AuthService],
    children: [
      { path: 'customers', component: CustomersPageComponent },
      { path: 'contacts', component: ContactsPageComponent },
      { path: 'contacts/edit-customer/:id', component: EditPageComponent },
      { path: 'contacts/view-customer/:id', component: ViewPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
