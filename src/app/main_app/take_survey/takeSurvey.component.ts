import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KumulosService } from '../../shared/services/kumulos.service';
import { MdSnackBar, MdProgressBar } from '@angular/material';


@Component({
  selector: 'app-takesurvey',
  templateUrl: './takeSurvey.component.html',
  styleUrls: ['./takeSurvey.component.css']
})
export class TakeSurveyComponent {

  private takeSurveyDashboard: Array<JSON>;
  public indexModuleSelected: any;

  private totalProgress: JSON;
  public progressValue: number;

  public surveyModules: Array<any>;
  public sectionModules: Array<any>;

  public innerLoopIndex: number;

  constructor(public router: Router, public kumulosService: KumulosService) {
    
    this.surveyModules = new Array();
    this.sectionModules = new Array();

    let activeCityVersion: string = localStorage.getItem('activeCityVersion');
    this.getWebDashboard(activeCityVersion);
  }

  private getWebDashboard(activeCityVersion: string): void {
    this.kumulosService.getWebDashboard(activeCityVersion)
      .subscribe(responseJSON => { 
        
        localStorage.setItem('surveydashboard', JSON.stringify(responseJSON.payload));

        this.takeSurveyDashboard = JSON.parse(localStorage.getItem('surveydashboard'));
        console.log(this.takeSurveyDashboard);

        this.removeTotalFromDashboard();
        this.calculateProgressValue();
        this.addModules(this.takeSurveyDashboard.length - 1);
        console.log(this.surveyModules);
    });
  }

  private removeTotalFromDashboard(): void {
    this.totalProgress = this.takeSurveyDashboard.pop();
  }

  public calculateProgressValue(): void {
    let statementCount: number = this.totalProgress['statementCount'];
    let surveyCount: number = this.totalProgress['surveyCount'];

    console.log("statment count: " + statementCount);
    console.log("survey count: " + surveyCount);

    if (!statementCount || !surveyCount)
      this.progressValue = 0;
    else
      this.progressValue = (surveyCount/statementCount) * 100;
      console.log("progressValue: ", this.progressValue);
      
  }

  public inChildComponents(): boolean {
    let currentUrl = this.router.url;

    let urlRegex = '(\/takesurvey\/.*)';

    return !currentUrl.match(urlRegex) ? true : false;
  }

  public navigateToSurveyModule(outerIndex: number, innerIndex: number) {

    this.indexModuleSelected = this.calculateIndexPosition(outerIndex, innerIndex);

    console.log("selected module: " + this.indexModuleSelected);
 
    this.storeSelectedModule();

    this.router.navigateByUrl('/main/takesurvey/surveymodule');
  }

  private calculateIndexPosition(outerIndexPosition:number, innerIndexPosition:number): number {
    let lastObjectPosition: number = 0;
    let lengthOfCurrentModule = this.surveyModules[outerIndexPosition].length - 1;

    for (let i = 0; i <= outerIndexPosition; i++) {
      lastObjectPosition += this.surveyModules[i].length;
    }

    lastObjectPosition -= 1;
    console.log("last object pos: " + lastObjectPosition);
    console.log("innerIndexPos: " + innerIndexPosition);

    let difference: number = lengthOfCurrentModule - innerIndexPosition;
    let correctIndexPosition: number = lastObjectPosition - difference;

    return correctIndexPosition;
  }

  private storeSelectedModule(): void {
    localStorage.setItem('userSelectedModule', this.indexModuleSelected.toString());
  }

  public changeSurveyProgressBackground(i: number, j: number): any {
    let surveyCount = this.surveyModules[i][j]['surveyCount'];
    let statementCount = this.surveyModules[i][j]['statementCount'];

    if (surveyCount == 0) {
      return { 'background-color': '#7abed8' };
    }
    else if (surveyCount < statementCount) {
      return { 'background-color': '#f1be5e' };
    }
    else {
      return { 'background-color': '#9aca71' };
    }    
  }


  public addModules(size: number): void {
    
    if (size < 0)
      return;

    let currentAreaId: number = this.takeSurveyDashboard[size]['areaID'];
    let nextAreaId: number;

    if (size != 0)
      nextAreaId = Number(this.takeSurveyDashboard[size - 1]['areaID']);
    
    let currentObject: any = this.takeSurveyDashboard[size];

    if (currentAreaId == 0 || currentAreaId == nextAreaId) {
      this.sectionModules.unshift(currentObject);
    } else {
      this.sectionModules.unshift(currentObject);
      this.surveyModules.unshift(this.sectionModules);
      this.sectionModules = [];
    }
    return this.addModules(size - 1);
  }

  public innerLoop(): boolean {
    return this.innerLoopIndex != 0 ? true : false; 
  }
}


