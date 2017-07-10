import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { KumulosService } from '../shared/services/kumulos.service';

@Component({
    selector: 'mainApp-page',
    styleUrls: ['./mainApp.component.css'],
    template:
    `   
    <div class="marginBottomMainApp"></div>
    `
}) 

export class MainAppComponent{
    constructor(public authService: AuthService, public kumulosService: KumulosService) {}
 }