import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { benchmarkRouting } from './benchmark.routing';

import { BenchmarkComponent } from './benchmark.component';

@NgModule({
  imports: [benchmarkRouting, CommonModule],
  declarations: [BenchmarkComponent],
  providers: []
  
})
export class BenchmarkModule { }