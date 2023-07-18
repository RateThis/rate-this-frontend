import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './carousel.component';
import { GradientArrowComponent } from './components/gradient-arrow/gradient-arrow.component';
import { PagerDirective } from './directives/pager.directive';

@NgModule({
  declarations: [
    CarouselComponent,
    PagerDirective,
    GradientArrowComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule { }
