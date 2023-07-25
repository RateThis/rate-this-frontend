import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CarouselModule } from './modules/carousel/carousel.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

import { ScoreWidgetComponent } from './components/score-widget/score-widget.component';
import { ClipComponent } from './components/clip/clip.component';
import { MeasureUnitPipe } from './pipes/measure-unit.pipe';

@NgModule({
  declarations: [
    ScoreWidgetComponent,
    ClipComponent,
    MeasureUnitPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    ReviewsModule,
    ScoreWidgetComponent,
    ClipComponent,
    MeasureUnitPipe
  ]
})
export class SharedModule { }
