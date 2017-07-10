import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';

import { Router } from '@angular/router';


@Component({
  selector: 'app-takesurvey',
  templateUrl: './viewResults.component.html',
  styleUrls: ['./viewResults.component.css']
})
export class ViewResultsComponent {

    candleChartIsDisplayed: boolean;
    comboChartIsDisplayed: boolean;

    constructor(public router: Router) {
        this.router.navigateByUrl('/main/viewresults/myownresults');
        this.candleChartIsDisplayed = false;
        this.comboChartIsDisplayed = false;
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
        this.router.navigateByUrl('main/takesurvey/customerengagement/teamdynamics');
        break;
      }
    }

//     public candle_ChartData = [
//         ['Sections', 'Low', 'Opening value', 'Closing value', 'High'],
//         ['1.1.1', 1, 1.2, 3, 3],
//         ['1.1.2', 1, 1.2, 4, 4.2],
//         ['1.1.3', 1, 1.2, 4, 4.2],
//         ['1.1.4', 1, 1.2, 4, 4.2],
//         ['1.1.5', 1, 1.2, 4, 4.2]
//     ];

//     public candle_ChartOptions = {
//         legend: 'none',
//         bar: { groupWidth: '25%' }, // Remove space between bars.
//         candlestick: {
//             fallingColor: { strokeWidth: 0, fill: '#A9A9A9' }, // red
//             risingColor: { strokeWidth: 0, fill: '#A9A9A9' }   // green
//         }
//     };

//  public comboChartData:any =  {
//     chartType: 'ComboChart',
//     dataTable: [
//       ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
//       ['2004/05',  165,      938,         522,             998,           450,      614.6],
//       ['2005/06',  135,      1120,        599,             1268,          288,      682],
//       ['2006/07',  157,      1167,        587,             807,           397,      623],
//       ['2007/08',  139,      1110,        615,             968,           215,      609.4],
//       ['2008/09',  136,      691,         629,             1026,          366,      569.6]
//     ],
//     options: {
//       title : 'Monthly Coffee Production by Country',
//       vAxis: {title: 'Cups'},
//       hAxis: {title: 'Month'},
//       seriesType: 'bars',
//       series: {5: {type: 'line'}}
//     }
//   };

//   public showCandleChart(): void {
//     this.candleChartIsDisplayed = true;
//     this.comboChartIsDisplayed = false;
//   }

//   public showComboChart(): void {
//     this.comboChartIsDisplayed = true;
//     this.candleChartIsDisplayed = false;
//   }

//   public isCandleChartDisplayed(): boolean {
//       return this.candleChartIsDisplayed;
//   }

//    public isComboChartDisplayed(): boolean {
//       return this.comboChartIsDisplayed;
//    }

   public activeBackgroundColor() {
        return { 'background-color': '#1e90ff',
                  'color': 'white' };
    }
    
  
}