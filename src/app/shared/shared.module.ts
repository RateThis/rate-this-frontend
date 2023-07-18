import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ScoreWidgetComponent } from './components/score-widget/score-widget.component';
import { CarouselModule } from './modules/carousel/carousel.module';

@NgModule({
  declarations: [
    ScoreWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    ScoreWidgetComponent
  ]
})
export class SharedModule { }
