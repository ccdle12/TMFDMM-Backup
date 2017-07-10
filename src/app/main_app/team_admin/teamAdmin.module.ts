import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdButtonModule, MdGridListModule, MdIconModule } from '@angular/material';


import { teamAdminRouting } from './teamAdmin.routing';
import { TeamAdminComponent } from './teamAdmin.component';
import { KumulosService } from '../../shared/services/kumulos.service';
import { ValidationService } from '../../shared/services/validation.service';

@NgModule({
    imports: [teamAdminRouting, CommonModule, MdCardModule, MdButtonModule, MdGridListModule, MdIconModule],
    declarations: [TeamAdminComponent],
    providers: [KumulosService, ValidationService],
})

export class TeamAdminModule {};