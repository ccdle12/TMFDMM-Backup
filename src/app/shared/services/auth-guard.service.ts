import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/main']);
      return false;
    }
    
    if (this.auth.isAuthenticated() && !this.auth.isVerified()) {
      this.router.navigate(['welcome']);
      return false;
    }

    return true;
  }
}