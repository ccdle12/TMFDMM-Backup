import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFoundComponent} from './not_found/notFound.component';
import { WelcomeGuardService } from './shared/services/welcome-guard.service';
import { AuthCallbackComponent } from './authCallback/authCallback.component';

import { MainAppModule } from './main_app/mainApp.module';

import { RegistrationModule } from './registration/registration.module';

const appRoutes: Routes = [
    {
        path: '', 
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'main',
        loadChildren: 'app/main_app/mainApp.module#MainAppModule',
    },
    {
        path: 'callback',
        component: AuthCallbackComponent,
    },
    {
        path: 'welcome',  
        component: WelcomeComponent, 
        canActivate: [WelcomeGuardService]
    },
    {
        path: 'registration',
        loadChildren: 'app/registration/registration.module#RegistrationModule'
    },
    {path: '**', component: NotFoundComponent},
]

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);