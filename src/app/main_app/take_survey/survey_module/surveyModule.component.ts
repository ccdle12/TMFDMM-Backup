import { Component, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  moduleId: module.id,
  selector: 'surveyModuel',
  templateUrl: './surveyModule.component.html',
  styleUrls: ['./surveyModule.component.css']
})
export class SurveyModuleComponent  {

    constructor(public router: Router, public authService: AuthService) { 
          this.router.navigateByUrl('/main/takesurvey/surveymodule/survey');
    }  

    public activeBackgroundColor() {
        return { 'background-color': '#62B3D1',
                  'color': 'white' }; 
    }

    public routeToPage(surveyPage: String) {
       console.log('routetoPage activated: ' + surveyPage);
        switch(surveyPage) {
          case('survey'):
            this.router.navigateByUrl('main/takesurvey/surveymodule/survey');
            break;
          case ('evidence'):
            this.router.navigateByUrl('main/takesurvey/surveymodule/evidence');
            break;
          case ('bestPractice'):
            this.router.navigateByUrl('main/takesurvey/surveymodule/bestpractice');
            break;
          case ('caseStudies'):
            this.router.navigateByUrl('main/takesurvey/surveymodule/casestudies');
            break;
        }
    }
}
