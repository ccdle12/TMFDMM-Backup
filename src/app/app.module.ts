import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from './shared/services/auth.service';
import { WelcomeGuardService } from './shared/services/welcome-guard.service';
import { LocalStorageService } from './shared/services/localStorage.service';
import { KumulosService} from './shared/services/kumulos.service';

import { appRouting } from './app.routing';
import { AppComponent } from './app.component';
import { WelcomeComponent, RegisterCityDialog } from './welcome/welcome.component';
import { SurveyComponent, RemindUserToSaveDialog, InDemoModeDialog, SaveSnackBarComponent } from './main_app/take_survey/survey_module/survey/survey.component';
import { NotFoundComponent } from './not_found/notFound.component';
import { AuthCallbackComponent } from './authCallback/authCallback.component';

import { EmailSentSnackBarComponent, EmailMyOwnResultsDialog } from './main_app/view_results/my_own_results/myOwnResults.component';
import { MdProgressSpinnerModule, MdDialogModule, MdMenuModule, MdIconModule, MdInputModule, MdButtonModule } from '@angular/material';
import { EditUserDetailsDialog } from './app.component';
import { InviteUserDialog } from './main_app/team_admin/teamAdmin.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlMessagesComponent } from './shared/dialogs/controlMessages.component';

import { EmailTeamDynamicsDialog } from './main_app/view_results/team_dynamics/teamDynamics.component';

import { EmailOrganizationResultsDialog } from './main_app/view_results/our_organization_results/organizationResults.component' 

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpModule, appRouting, MdProgressSpinnerModule, MdDialogModule, MdMenuModule, MdIconModule, MdInputModule, MdButtonModule],
  declarations: [AppComponent, WelcomeComponent, RegisterCityDialog, RemindUserToSaveDialog, InDemoModeDialog, NotFoundComponent, AuthCallbackComponent, 
                 SaveSnackBarComponent, EmailSentSnackBarComponent, EditUserDetailsDialog, InviteUserDialog, ControlMessagesComponent, EmailMyOwnResultsDialog, EmailTeamDynamicsDialog, EmailOrganizationResultsDialog],
  entryComponents: [RegisterCityDialog, RemindUserToSaveDialog, InDemoModeDialog, SaveSnackBarComponent, EmailSentSnackBarComponent, EditUserDetailsDialog, InviteUserDialog, EmailMyOwnResultsDialog, EmailTeamDynamicsDialog, EmailOrganizationResultsDialog],
  providers: [AuthService, WelcomeGuardService, LocalStorageService, KumulosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
