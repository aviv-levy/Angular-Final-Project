import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivateChild, CanActivate {
  redirectUrl = '';

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {

    if (this.isLoggedIn())
      return false;
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {

    if (this.isLoggedIn())
      return state.url === '/login' ? this.router.navigate(['/']) : true;

    this.redirectUrl = state.url;

    return this.router.navigate(['login'])
  }

  isLoggedIn(): boolean {
    const token = this.api.getToken();
    return (token && token.length > 0) ? true : false;
  }
}
