import { Component, ViewChild } from '@angular/core';
import { MdSliderModule, MdTooltipModule, MdSidenavModule, MdButtonToggleModule, MdTabsModule, MdButtonModule, MdIconModule} from '@angular/material';
import { KumulosService } from '../../../../shared/services/kumulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent { 

    evidence: JSON[];

    @ViewChild('start') sidenav: MdSidenavModule;

    constructor(public kumulos: KumulosService, public router: Router) {
        let parsedSurveyDashboard = JSON.parse(localStorage.getItem('surveydashboard'));
        let areaID = parsedSurveyDashboard[0]['areaID'];
        let dimensionID = parsedSurveyDashboard[0]['dimensionID'];

        let activeCityVersion = localStorage.getItem('activeCityVersion');

        this.kumulos.getWebGetEvidence(activeCityVersion, areaID, dimensionID).subscribe(responseJSON => {
            this.evidence = responseJSON.payload;
            console.log("Best Practices: ", this.evidence);
        })
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

  public backToTakeSurvey(): void {
    this.router.navigateByUrl('/callback').then(() => this.router.navigateByUrl('/main/takesurvey'));
  }
}