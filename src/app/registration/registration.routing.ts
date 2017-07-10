import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'

import { RegistrationComponent } from './registration.component';

const registrationRoutes: Routes = [
    {
        path: '',
        component: RegistrationComponent,

    }                                                                           
]   

export const registrationRouting: ModuleWithProviders = RouterModule.forChild(registrationRoutes); 