import { Injectable } from '@angular/core';
import {MdProgressSpinner} from '@angular/material';

@Injectable()
export class SpinnerService {
    
    constructor(spinner: MdProgressSpinner) { }

    public start(): void {
        
    }
}