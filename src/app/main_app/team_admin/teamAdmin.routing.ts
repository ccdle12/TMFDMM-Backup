import { Routes, RouterModule }    from '@angular/router';
import { ModuleWithProviders }     from '@angular/core'

import { TeamAdminComponent }      from './teamAdmin.component';

const mainAppRoutes: Routes = [
    {
        path: '',
        component: TeamAdminComponent,

    }                                                                           
]   

export const teamAdminRouting: ModuleWithProviders = RouterModule.forChild(mainAppRoutes); 