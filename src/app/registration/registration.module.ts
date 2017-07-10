import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { registrationRouting } from './registration.routing';
import { RegistrationComponent } from './registration.component';

// import { ControlMessagesComponent } from '../shared/dialogs/controlMessages.component';
import { ValidationService } from '../shared/services/validation.service';

@NgModule({
    imports: [registrationRouting, CommonModule, ReactiveFormsModule],
    declarations: [RegistrationComponent], 
    providers: [ValidationService],
})

export class RegistrationModule {};