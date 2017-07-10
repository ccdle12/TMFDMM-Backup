import { Component, OnInit, ViewChild} from '@angular/core';
import { KumulosService } from '../../../../shared/services/kumulos.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { MdSliderModule, MdSidenavModule  } from '@angular/material';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { MdSnackBar } from '@angular/material';

import { ComponentCanDeactivate } from '../../../../shared/services/saveSurvey-guard.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements ComponentCanDeactivate {

    private activeCityVersion: string;
    public surveyQuestions: Array<JSON>;

    private importanceValues: Array<any>;
    private importanceToolTips: Array<string>;

    private capabilityValues: Array<any>;
    private capabilityToolTips: any[];

    private twoYearTargetValues: Array<any>;

    private surveyCount: any;

    private areaID: any;
    private dimensionID: any;
    public dimensionText: any;

    public userSaved: boolean;

    private userSelectedModule: any;
    private sizeOfModules: number;

    constructor(public kumulosService: KumulosService, 
                public router: Router,
                public dialog: MdDialog,
                public authService: AuthService,
                public snackBar: MdSnackBar) { 
      
      this.initializeMemberVariables();
      this.getWebSurveyQuestions(); 
    }
                
    canDeactivate(): Observable<boolean> | boolean {
      return true;
    }

    // @ViewChild('start') sidenav: MdSidenavModule;

    private initializeMemberVariables(): void {
      this.userSelectedModule = localStorage.getItem('userSelectedModule');

      let surveyDashboard: JSON = JSON.parse(localStorage.getItem('surveydashboard'));
      this.sizeOfModules = Object.keys(surveyDashboard).length - 1;

      this.userSaved = false;

      this.importanceValues = new Array();

      this.importanceToolTips = new Array();
      this.importanceToolTips[0] = "1 - Little Importance";
      this.importanceToolTips[1] = "2 - Some Importance";
      this.importanceToolTips[2] = "3 - Generally Important";
      this.importanceToolTips[3] = "4 - Significant Importance";
      this.importanceToolTips[4] = "5 - Key/pivotal priority";

      this.capabilityValues = new Array();
      this.capabilityToolTips = new Array();

      this.twoYearTargetValues = new Array();

      let parsedSurveyDashboard = JSON.parse(localStorage.getItem('surveydashboard'));
      this.areaID = parsedSurveyDashboard[this.userSelectedModule]['areaID'];
      this.dimensionID = parsedSurveyDashboard[this.userSelectedModule]['dimensionID'];
      this.dimensionText = parsedSurveyDashboard[this.userSelectedModule]['dimensionText'];

      this.activeCityVersion = localStorage.getItem('activeCityVersion');

    }

    public getUserSaved(): boolean {
      return this.userSaved;
    }

    private getWebSurveyQuestions() {
      this.kumulosService.getWebSurvey(this.activeCityVersion, this.areaID, this.dimensionID )
        .subscribe(responseJSON => {
         this.surveyQuestions = responseJSON.payload;
         
         this.updateSurveyValues();
         this.updateToolTips();
         console.log('survey questions', responseJSON.payload); 
      });
  }
    
    private updateSurveyValues(): void {

      for (var eachQuestion = 0; eachQuestion < this.surveyQuestions.length; eachQuestion++) {
        
        if (this.surveyQuestions[eachQuestion]['importance'] == " " || this.surveyQuestions[eachQuestion]['importance'] == "0") {
          this.importanceValues[eachQuestion] = " ";
        } else {
          this.importanceValues[eachQuestion] = this.surveyQuestions[eachQuestion]['importance'];
        }

         if (this.surveyQuestions[eachQuestion]['score'] == " " || this.surveyQuestions[eachQuestion]['score'] == "0") {
          this.capabilityValues[eachQuestion] = " ";
        } else {
          this.capabilityValues[eachQuestion] = this.surveyQuestions[eachQuestion]['score'];
        }

        if (this.surveyQuestions[eachQuestion]['target'] == " " || this.surveyQuestions[eachQuestion]['target'] == "0") {
          this.capabilityValues[eachQuestion] = " ";
        } else {
          this.twoYearTargetValues[eachQuestion] = this.surveyQuestions[eachQuestion]['target'];
        }
      }
    }

    private updateToolTips(): void {
      let toolTipsTexts = new Array();

      for (var eachQuestion = 0; eachQuestion < this.surveyQuestions.length; eachQuestion++) {
        for (var scoreText = 1; scoreText <= 5; scoreText++) {
          toolTipsTexts[scoreText] = scoreText + " - " + this.surveyQuestions[eachQuestion]['scoringID' + scoreText + 'Text'];  
        }

        this.capabilityToolTips.push(toolTipsTexts);
        toolTipsTexts = [];
      }
    }

  public backToTakeSurvey(): void {
    this.router.navigateByUrl('/callback').then(() => this.router.navigateByUrl('/main/takesurvey'));
  }

  public saveSurveyInput(): void {
    console.log('saveSurveyClicked');

    // if (this.authService.inDemoMode()) {
    //   this.dialog.open(InDemoModeDialog);
    //   return;
    // }

    if (this.authService.canSaveSurvey()) {
      this.dialog.open(InDemoModeDialog);
      return;
    }

    this.userSaved = true;
    this.updateSurveyData();
  }

  public nextModule(): void {
    if (!this.authService.inDemoMode() && !this.userSaved) {
      this.dialog.open(RemindUserToSaveDialog);

      return;    
    }

    this.incrementSelectedModule();
    window.location.reload();
  }

  private incrementSelectedModule(): void {
    let userSelectedModule: number = parseInt(localStorage.getItem('userSelectedModule'));
    let incrementUserSelectedModule = userSelectedModule += 1;

    localStorage.setItem('userSelectedModule', incrementUserSelectedModule.toString());
  }

  public previousModule(): void {
    this.decrementSelectedModule();

    window.location.reload();
    return;    
  }

  private decrementSelectedModule(): void {
    let userSelectedModule: number = parseInt(localStorage.getItem('userSelectedModule'));
    let decrementUserSelectedModule = userSelectedModule -= 1;

    localStorage.setItem('userSelectedModule', decrementUserSelectedModule.toString());
  }

  public notAtStartOfModules(): boolean {
    let userSelectedModule: number = parseInt(localStorage.getItem('userSelectedModule'));
    if (userSelectedModule == 0) {
      return false;
    }

    return true;
  }

  public notAtEndOfModules(): boolean {
    let userSelectedModule: number = parseInt(localStorage.getItem('userSelectedModule'));
    
    if (userSelectedModule == this.sizeOfModules) {
      return false;
    }

    return true;
  }

  public updateSurveyData(): void {
    let activeCityVersion: string = localStorage.getItem('activeCityVersion');
    let JSONArray = new Array();

    for (var eachQuestion = 0; eachQuestion < this.surveyQuestions.length; eachQuestion++) {

      let importance: number = this.importanceValues[eachQuestion];
      let score: number = this.capabilityValues[eachQuestion];
      let target: number = this.twoYearTargetValues[eachQuestion];

      if (importance != 0 && score != 0 && target != 0) {
        let userSurveyID = this.surveyQuestions[eachQuestion]['userSurveyID'];
        let statementID = this.surveyQuestions[eachQuestion]['statementID'];
        let dimensionID = this.surveyQuestions[eachQuestion]['dimensionID'];
        let areaID = this.surveyQuestions[eachQuestion]['areaID'];

        let surveyJsonObject = {"areaID":areaID,"dimensionID": dimensionID,"statementID": statementID,"importance": importance,"score": score,"target": target,"version": activeCityVersion,"userSurveyID": userSurveyID};
        JSONArray.push({"areaID":areaID,"dimensionID": dimensionID,"statementID": statementID,"importance": importance,"score": score,"target": target,"version": activeCityVersion,"userSurveyID": userSurveyID});
      }
    }

    console.log("JSON ARRAY: ", JSONArray);
    let hardCodeJson = {"surveyData": JSONArray };
    let surveyDataString = JSON.stringify(hardCodeJson);

    this.kumulosService.getCreateUpdateUserSurveyData(surveyDataString)
      .subscribe(responseJSON => {
        this.showSnackBar();
        this.getWebSurveyQuestions();
      });
  }

    public activeBackgroundColor() {
        return { 'background-color': '#1e90ff',
                  'color': 'white' };
    }

  public showSnackBar(): void {
    this.snackBar.openFromComponent(SaveSnackBarComponent, {
      duration: 1000,
    });
  }
}


@Component({
  selector: 'remindUserToSave-dialog',
  templateUrl: 'remindUserToSaveDialog.html',
})
export class RemindUserToSaveDialog { }

@Component({
  selector: 'inDemoMode-dialog',
  templateUrl: 'inDemoMode.html',
})
export class InDemoModeDialog { }

@Component({
  selector: 'saveSnackBar',
  templateUrl: 'saveSnackBarComponent.html',
  styleUrls: ['saveSnackBarComponent.css'],
})
export class SaveSnackBarComponent {}
