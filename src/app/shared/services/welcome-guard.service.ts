import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class WelcomeGuardService {

  constructor(private auth: AuthService, private router: Router) { }


  canActivate() {
    // If user is logged in we'll send them to the main page

    // console.log('in can activate welcome');
    // console.log('this.auth.loggedin status  ', this.auth.isAuthenticated());
    
    if (this.auth.isAuthenticated() && this.auth.isVerified()) {
      this.router.navigate(['main']);
      return false;
    } 
    
    return true;
  }

}