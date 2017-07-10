import { Component }  from '@angular/core';
import { KumulosService } from '../../shared/services/kumulos.service';
import { MdDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation.service';

import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

import {NgZone, Renderer, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'teamAdmin',
  templateUrl: 'teamAdmin.component.html',
  styleUrls: ['./teamAdmin.component.css']
})

export class TeamAdminComponent  { 
  userProfiles:  JSON[];

  constructor(private kumulosService: KumulosService, public dialog: MdDialog) {
    this.kumulosService.getWebUsers().subscribe(response => {
          console.log("response", response.payload);
          this.userProfiles = response.payload
          console.log(this.userProfiles);
    });
  }

  public addNewUser(): void {
   this.dialog.open(InviteUserDialog);
  }


  public getUsersName(index: number): string {
    let userName: string;

    if (this.hasUserMetaData(index))
      userName = this.userProfiles[index]['user_metadata']['name'];
    else 
      userName = this.userProfiles[index]['name'];
    
    return userName;
  }

  public getUsersTitle(index: number): string {
    let userTitle: string;

    if (this.hasUserMetaData(index))
      userTitle = this.userProfiles[index]['user_metadata']['jobTitle'];
    else 
      userTitle = this.userProfiles[index]['headline'];
    
    return userTitle;
  }  

  private hasUserMetaData(index: number): boolean {
    return this.userProfiles[index]['user_metadata'] ? true : false;
  }
}

@Component({
  selector: 'inviteUserDialog',
  templateUrl: '../../shared/dialogs/inviteUserDialog.html',
  styleUrls: ['../../shared/dialogs/inviteUserDialog.css']
})
export class InviteUserDialog {

  httpRequestFlag: boolean;
  inviteUserForm: FormGroup;
  
  @ViewChild('spinnerElement') loadingElement: ElementRef;

  constructor(private formBuilder: FormBuilder, public kumulosService: KumulosService, 
              public renderer: Renderer, private ngZone: NgZone) {
    
    this.inviteUserForm = this.formBuilder.group({
     email: ['', [Validators.required, ValidationService.emailValidator]],
    });
  }

  public inviteNewUser(): void {
    let cityName: string = this.getCityName();
    console.log("City Name: " + cityName);
    let cityId: string = this.getCityId();
    let email: string = this.inviteUserForm.value.email;
    
    this.httpRequestFlag = true;
    this.kumulosService.inviteUser(email, cityName, cityId).subscribe(responseJSON => {
      console.log("response", responseJSON.payload);
      this.reloadPage();
    })
  }

  private reloadPage(): void {
    window.location.reload();
  }

  private getCityName(): string {
    let userProfile: JSON = this.getUserProfile();
    let city: string = userProfile['app_metadata']['city'];
    return city;
  };

  private getCityId(): string {
    let userProfile: JSON = this.getUserProfile();
    let cityId: string = userProfile['app_metadata']['city_id'];

    return cityId;
  }

  private getUserProfile(): JSON {
    return JSON.parse(localStorage.getItem('userProfile'));
  }

  onSubmit() {}
}
