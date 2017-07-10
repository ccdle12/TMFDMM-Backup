import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { viewResultsRouting } from './viewResults.routing';
import { ViewResultsComponent } from './viewResults.component';
import { NvD3Component } from 'ng2-nvd3';

import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { MdSliderModule, MdTooltipModule, MdSidenavModule, MdButtonToggleModule, MdTabsModule, MdButtonModule, MdIconModule, MdCardModule, MdSnackBarModule} from '@angular/material';

import { MyOwnResultsComponent } from './my_own_results/myOwnResults.component';
import { OrganizationResultsComponent } from './our_organization_results/organizationResults.component';
import { TeamDynamicsComponent } from './team_dynamics/teamDynamics.component';


@NgModule({
  imports: [viewResultsRouting, CommonModule, Ng2GoogleChartsModule, MdTabsModule, MdButtonModule, MdSnackBarModule],
  declarations: [ViewResultsComponent, GoogleChart, MyOwnResultsComponent, OrganizationResultsComponent, TeamDynamicsComponent ],
  providers: [],
})
export class ViewResultsModule { }