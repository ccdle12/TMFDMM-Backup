import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'

import { TakeSurveyComponent } from './takeSurvey.component';


const takeSurveyRoutes: Routes = [
    {
        path: '',
        component: TakeSurveyComponent,
        children: [
            {
                path: 'surveymodule',
                loadChildren: './survey_module/surveyModule.module#SurveyModule'
            }
        ]
    },                                                                        
]   

export const takeSurveyRouting: ModuleWithProviders = RouterModule.forChild(takeSurveyRoutes); 