import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { KumulosService } from '../shared/services/kumulos.service';
import { MdDialog } from '@angular/material';

@Component({
    selector: 'welcome-page',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
}) 
export class WelcomeComponent   {

 constructor(public authService: AuthService, public dialog: MdDialog) { }

  openDialog(): void {
    this.dialog.open(RegisterCityDialog);
  }
  
}

@Component({
  selector: 'registerCityDialog-dialog',
  templateUrl: 'registerCityDialog.html',
})
export class RegisterCityDialog {

  allCities: Array<String>;

  constructor(public kumulosService: KumulosService) {
    this.initializeInstanceVariables();
    this.getAllCitiesFromKumulos();  
  }

  initializeInstanceVariables(): void {
    this.allCities = new Array();
  }

  getAllCitiesFromKumulos(): void {
    this.kumulosService.getAllCities()
      .subscribe(responseJSON => {
        responseJSON.payload.map(eachCity => { this.allCities.push(eachCity.name); }); 
      });
    
    console.log('allCities', this.allCities);
  }

}
