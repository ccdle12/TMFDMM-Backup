import { Routes, RouterModule }    from '@angular/router';
import { ModuleWithProviders }     from '@angular/core'

import { PublicationComponent }     from './publication.component';

const mainAppRoutes: Routes = [
    {
        path: '',
        component: PublicationComponent,

    }                                                                           
]   

export const publicationRouting: ModuleWithProviders = RouterModule.forChild(mainAppRoutes); 