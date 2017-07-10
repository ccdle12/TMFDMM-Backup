import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KumulosService } from '../../../shared/services/kumulos.service';
import { AuthService } from '../../../shared/services/auth.service';
import { MdSnackBar } from '@angular/material';
import { EmailSentSnackBarComponent } from '../my_own_results/myOwnResults.component';

import { MdDialog } from '@angular/material';

@Component({
  selector: 'teamDynamicsComponent',
  templateUrl: './teamDynamics.component.html',
  styleUrls: ['./teamDynamics.component.css']
})
export class TeamDynamicsComponent { 

  public candleChartsForDisplay: Array<any>;
  public graphData: Array<any>;
  public numberOfGraphs: number;

  private sortedDataForEachGraph: Array<any>;

  public graphTitles: Map<number, string>;

  constructor(public router: Router, public kumulosService: KumulosService, 
              public snackBar: MdSnackBar, public authService: AuthService,
              public dialog: MdDialog) {
    this.initializeMemberVariables();
    this.getTeamDynamicsData();
  }

  private initializeMemberVariables(): void {
    this.candleChartsForDisplay = new Array();
    this.graphData = new Array();

    this.sortedDataForEachGraph = new Array();
    
    this.graphTitles = new Map<number, string>();
  }

  private getTeamDynamicsData(): void {
    let activeCityVersion: string = localStorage.getItem('activeCityVersion');

    this.kumulosService.getWhiskerBoxDataByVersion(activeCityVersion)
        .subscribe(responseJSON =>{
          this.graphData = responseJSON.payload;
          this.numberOfGraphs = this.graphData.length;
          this.createCandleCharts();
          this.addGraphTitles();
        })
  }

   public backToDashboard(): void {
    this.authService.backToDashboard();
  }

  public activeBackgroundColor() {
        return { 'background-color': '#62B3D1',
                  'color': 'white' };
    }

  public routeToPage(surveyPage: String) {
    console.log('routetoPage activated: ' + surveyPage);
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

    private createCandleCharts(): void {
      this.addToCandleChartArray(this.numberOfGraphs - 1);
    }

    private addToCandleChartArray(graphIndexPosition: number): any {
      if (graphIndexPosition < 0)
        return;

      let currentGraphData: JSON = this.graphData[graphIndexPosition];
      let nextGraphData: JSON;

      let currentDimensionID: number = Number(currentGraphData['dimensionID']);
      let nextDimensionID: number;

      if (graphIndexPosition != 0) {
        nextGraphData = this.graphData[graphIndexPosition - 1];
        nextDimensionID = Number(nextGraphData['dimensionID']);
      }

      let statementId: string = currentGraphData['statementID'];
      let boxValueLow: number = Number(currentGraphData['boxValueLow']);
      let boxValueHigh: number = Number(currentGraphData['boxValueHigh']);
      let boxValueQ1: number = Number(currentGraphData['boxValueQ1']);
      let boxValueQ2: number = Number(currentGraphData['boxValueQ2']);
      let statementText: string = currentGraphData['statementText'];

      let toolTip: string = statementId + ": " + statementText;
      

      if (currentDimensionID == 0 || currentDimensionID == nextDimensionID) {
        this.sortedDataForEachGraph.unshift([statementId, boxValueLow, boxValueQ1, boxValueQ2, boxValueHigh, toolTip]);
      } else {
        this.sortedDataForEachGraph.unshift([statementId, boxValueLow, boxValueQ1, boxValueQ2, boxValueHigh, toolTip]);
        this.sortedDataForEachGraph.unshift(['Sections', 'Low', 'Opening value', 'Closing value', 'High', {role: 'tooltip'}]);
        this.candleChartsForDisplay.unshift(this.sortedDataForEachGraph);
        console.log(this.sortedDataForEachGraph);
        this.sortedDataForEachGraph = [];
      }

      return this.addToCandleChartArray(graphIndexPosition - 1);
    }

    private addGraphTitles(): void {
      let graphDataIndexPos: number = 0;
      let chartsDisplayedIndexPos: number = 0;

      while (graphDataIndexPos < this.graphData.length - 1) {


        let lengthOfEachDisplayedGraph: number = this.candleChartsForDisplay[chartsDisplayedIndexPos].length;
        let dimensionTextIndexPos: number = (graphDataIndexPos + lengthOfEachDisplayedGraph) - 1;

        if (this.graphData[dimensionTextIndexPos]) {
          let dimensionTextData: string = this.graphData[dimensionTextIndexPos]['dimensionText'];
          console.log(this.graphData[dimensionTextIndexPos]);
          this.graphTitles.set(chartsDisplayedIndexPos, dimensionTextData);
        
        }

        chartsDisplayedIndexPos++;
        graphDataIndexPos = dimensionTextIndexPos
      }
    }

    public getGraphTitles(indexPos: number): any {
      return this.graphTitles.get(indexPos);
    }

    public candle_ChartOptions = {
        legend: 'none',
        bar: { groupWidth: '25%' }, // Remove space between bars.
        candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#A9A9A9' }, // red
            risingColor: { strokeWidth: 0, fill: '#A9A9A9' }   // green
        },
        tooltip: {
          trigger: 'focus',
          ignoreBounds: 'false',
          isHtml: 'true',
        },
        vAxis: {
          viewWindow: {
            min: 0,
            max: 5
          },
          ticks: [0, 1, 2, 3, 4, 5] 
        }
    };

    public requestSurveyCSV(): void {

      this.dialog.open(EmailTeamDynamicsDialog);
      // let activeCityVersion: string = localStorage.getItem('activeCityVersion');
      // let userProfile: JSON = JSON.parse(localStorage.getItem('userProfile'));

      // let emailAddress: string = userProfile['email'];

      // this.kumulosService.sendRequestSurveyCSV(activeCityVersion, emailAddress)
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

  public inTeamDynamics() {
        let currentUrl: string = window.location.pathname;

        if (currentUrl ===  "/main/viewresults/teamdynamics") {
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
  selector: 'emailTeamDynamicsDialog',
  templateUrl: './emailTeamDynamicsResultsDialog.html',
  styleUrls: ['./emailTeamDynamicsResultsDialog.css'],
})
export class EmailTeamDynamicsDialog {
  constructor(public router: Router,  public authService: AuthService, public kumulosService: KumulosService,
              public dialog: MdDialog) {
    console.log(this.router.url);
  }

  public sendSurveyRequest(): void {
    let activeCityVersion: string = localStorage.getItem('activeCityVersion');
      let userProfile: JSON = JSON.parse(localStorage.getItem('userProfile'));

      let emailAddress: string = userProfile['email'];

      this.kumulosService.sendRequestSurveyCSV(activeCityVersion, emailAddress)
        .subscribe(responseJSON => {
          console.log(responseJSON.payload);
          this.dialog.closeAll();
      });
  }
  
}