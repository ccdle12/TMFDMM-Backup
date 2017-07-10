import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { surveyModuleRouting } from './surveyModule.routing';
import { SurveyModuleComponent } from './surveyModule.component';
import { CaseStudiesComponent } from './case_studies/caseStudies.component';
import { BestPracticeComponent } from './best_practice/bestPractice.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { MdSliderModule, MdTooltipModule, MdSidenavModule, MdButtonToggleModule, MdTabsModule, MdButtonModule, MdIconModule, MdCardModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { SaveSurveyGuardService } from '../../../shared/services/saveSurvey-guard.service';


@NgModule({
  imports: [CommonModule, surveyModuleRouting, FormsModule, MdTooltipModule, MdSidenavModule, MdButtonToggleModule, MdTabsModule, MdButtonModule, MdIconModule,  MdSliderModule, MdCardModule],
  declarations: [SurveyModuleComponent, CaseStudiesComponent, BestPracticeComponent, EvidenceComponent],
  providers: [SaveSurveyGuardService],
  
})
export class SurveyModule { }