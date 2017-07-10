import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'

import { SurveyComponent } from './survey.component';

const surveyRoutes: Routes = [
    {
        path: '',
        component: SurveyComponent,
    },                                                               
]   

export const surveyRouting: ModuleWithProviders = RouterModule.forChild(surveyRoutes); 