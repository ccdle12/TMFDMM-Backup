import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KumulosService } from '../../../shared/services/kumulos.service';
import { AuthService } from '../../../shared/services/auth.service';
import { MdSnackBar } from '@angular/material';

import { MdDialog } from '@angular/material';


@Component({
  selector: 'myOwnResultsComponent',
  templateUrl: './myOwnResults.component.html',
  styleUrls: ['./myOwnResults.component.css']
})
export class MyOwnResultsComponent { 

  public comboCharts: Array<any>;
  public graphData: Array<any>;
  public graphTitles: Map<number, string>;

  constructor(public router: Router, public kumulosService: KumulosService, public snackBar: MdSnackBar, 
              public authService: AuthService, public dialog: MdDialog) {
    this.initializeMemberVariables();
    this.getOwnResultsData();
  }

  private initializeMemberVariables(): void {
    this.comboCharts = new Array();
    this.graphData = new Array();
  }

  private getOwnResultsData(): any { 
    let activeCityVersion: string = localStorage.getItem('activeCityVersion');
    let userProfile: JSON = JSON.parse(localStorage.getItem('userProfile'));
    let userID: string 

    userProfile == null ? userID = "demouser" : userID = userProfile['user_id']; 
    
    this.kumulosService.getAggregatesByVersionandUser(activeCityVersion, userID)
        .subscribe(responseJSON => {
          this.graphData = responseJSON.payload;
          this.createComboCharts();
    });
  }

  private createComboCharts(): void {
    
    let numberOfAreaModules: number = this.getSizeOfAreaModules();
    this.addToComboChartArray(numberOfAreaModules);
  }

  private getSizeOfAreaModules(): number {
    let surveyDashboard: JSON = JSON.parse(localStorage.getItem('surveydashboard'));
    let sizeOfDashboard: number = Object.keys(surveyDashboard).length;

    let numberOfAreaModules: number = surveyDashboard[sizeOfDashboard - 2]['areaID'];

    return numberOfAreaModules;
  }

  private addToComboChartArray(numberOfModules: number): void {
    for (var currentModule = 1; currentModule <= numberOfModules; currentModule++) {
      let areaText;

      let dataTableArray: any = new Array();
      dataTableArray.push(['SurveyData', 'Importance', 'Score', '2 Year Target' ]);


      for (var i = 0; i < this.graphData.length; i++) {
        let areaID = this.graphData[i]['areaID'];

        if (areaID == currentModule) {
          areaText = this.graphData[i]['areaText'];
          let dimensionText: string = this.graphData[i]['dimensionText']
          let importance: number = Number(this.graphData[i]['importance']);
          let score: number = Number(this.graphData[i]['score']);
          let target: number = Number(this.graphData[i]['target']);

          dataTableArray.push([ dimensionText, importance, score, target ]);

        }
      }

      let comboChart = {
            chartType: 'ComboChart',
            dataTable: dataTableArray,
            options: {
              title : areaText,
              seriesType: 'bars',
              vAxis: {
                viewWindow: {
                  min: 0,
                  max: 5
                },
                  ticks: [0, 1, 2, 3, 4, 5] 
                }
              }
            }
      this.comboCharts[currentModule] = comboChart;
    }
  }   

  public activeBackgroundColor() {
        return { 'background-color': '#62B3D1',
                  'color': 'white' };
    }

  public routeToPage(surveyPage: String) {
    // console.log('routetoPage activated: ' + surveyPage);
    switch(surveyPage) {
      case('myownresults'):
        this.router.navigateByUrl('main/viewresults/myownresults');
        break;
      case ('organizationresults'):
        this.router.navigateByUrl('main/viewresults/organizationresults');
        break;
      case ('teamdynamics'):
        this.router.navigateByUrl('main/viewresults/teamdynamics');
        break;
      }
    }

    public backToDashboard(): void {
      this.authService.backToDashboard();
    }

    public requestSurveyCSV(): void {
      this.dialog.open(EmailMyOwnResultsDialog);
      // let activeCityVersion: string = localStorage.getItem('activeCityVersion');
      // let userProfile: JSON = JSON.parse(localStorage.getItem('userProfile'));

      // let emailAddress: string = userProfile['email'];

      // this.kumulosService.requestIndividualSurveyCSV(activeCityVersion, emailAddress)
      //   .subscribe(responseJSON => {
      //     console.log(responseJSON.payload)
      //     this.showSnackBar();
      // });
  }

  public showSnackBar(): void {
    this.snackBar.openFromComponent(EmailSentSnackBarComponent, {
      duration: 1000,
    });
  }

   public inMyOwnResults() {
        let currentUrl: string = window.location.pathname;

        if (currentUrl ===  "/main/viewresults/myownresults") {
            console.log("in team admin");
            return { 'background-color': '#e28a1d',
                  'color': 'white' };    
        } else {
        console.log(window.location.pathname);
        return { 'background-color': '#62B3D1',
                  'color': 'white' };
        }
    }
}

@Component({
  selector: 'emailSentSnackBar',
  templateUrl: '../emailSentSnackBarComponent.html',
  styleUrls: ['../emailSentSnackBarComponent.css'],
})
export class EmailSentSnackBarComponent {}

@Component({
  selector: 'emailMyOwnResultsDialog',
  templateUrl: '../emailMyOwnResultsDialog.html',
  styleUrls: ['../emailMyOwnResultsDialog.css'],
})
export class EmailMyOwnResultsDialog {
  constructor(public router: Router,  public authService: AuthService, public kumulosService: KumulosService,
              public dialog: MdDialog) {
    console.log(this.router.url);
  }

  public sendSurveyRequest(): void {
    let activeCityVersion: string = localStorage.getItem('activeCityVersion');
    let userProfile: JSON = JSON.parse(localStorage.getItem('userProfile'));

    let emailAddress: string = userProfile['email'];

      this.kumulosService.requestIndividualSurveyCSV(activeCityVersion, emailAddress)
        .subscribe(responseJSON => {
          console.log(responseJSON.payload);
          this.dialog.closeAll();
          // this.showSnackBar();
      });
  }

}

