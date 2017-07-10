import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate, CanDeactivate } from '@angular/router';
import { AuthService } from './auth.service';
import { SurveyComponent } from '../../main_app/take_survey/survey_module/survey/survey.component';
import {Observable} from 'rxjs/Observable';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class SaveSurveyGuardService implements CanDeactivate<ComponentCanDeactivate> {

  constructor(private auth: AuthService, private router: Router) { }
  
  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //  console.log(next.component.toString());

    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['/main']);
    //   return false;
    // }
    
    // if (this.auth.isAuthenticated() && !this.auth.isVerified()) {
    //   this.router.navigate(['welcome']);
    //   return false;
    // }
    
    canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
      console.log('can deactivate');
      console.log(component);
      return true;
      // return component.canDeactivate() ? true : confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
    }

    // return true;
  // }
}