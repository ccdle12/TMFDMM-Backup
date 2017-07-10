import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CustomerEngagementBestPractice } from './bestPractice.component';
import { KumulosService } from '../../../../shared/services/kumulos.service';

import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  providers: [KumulosService],
})
export class BestPracticeModule { }