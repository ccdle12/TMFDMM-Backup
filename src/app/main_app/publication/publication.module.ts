import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { publicationRouting } from './publication.routing';

import { PublicationComponent } from './publication.component';

@NgModule({
  imports: [publicationRouting, CommonModule],
  declarations: [PublicationComponent],
  providers: [],
  
})
export class PublicationModule { }