import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'

import { BenchmarkComponent } from './benchmark.component';

const mainAppRoutes: Routes = [
    {
        path: '',
        component: BenchmarkComponent,
    }                                                                           
]   

export const benchmarkRouting: ModuleWithProviders = RouterModule.forChild(mainAppRoutes); 