import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from '../shared/services/validation.service';
import { KumulosService } from '../shared/services/kumulos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'registration-page',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
}) 

export class RegistrationComponent implements OnInit  {

    registrationForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private kumulosService: KumulosService,
                private router: Router) { };

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            name: ['', Validators.required],
            jobTitle: ['', Validators.required],
            organization: ['', Validators.required],
            country: ['', Validators.required],
            email: ['', [Validators.required, ValidationService.emailValidator]],
            phone: ['', [Validators.required, ValidationService.phoneValidator]],
            userDetail: '',
        });
    }

    onSubmit() {
        this.kumulosService.getSubmitInterestRequest(
            this.registrationForm.value.name,
            this.registrationForm.value.organization,
            this.registrationForm.value.jobTitle,
            this.registrationForm.value.country,
            this.registrationForm.value.email,
            this.registrationForm.value.phone,
            this.registrationForm.value.comments).subscribe(response => {
                this.router.navigate(['welcome']);
            }) 
    }
}