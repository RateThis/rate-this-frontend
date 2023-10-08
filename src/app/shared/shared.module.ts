import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CarouselModule } from './modules/carousel/carousel.module';

import { ScoreWidgetComponent } from './components/score-widget/score-widget.component';
import { ClipComponent } from './components/clip/clip.component';
import { MeasureUnitPipe } from './pipes/measure-unit.pipe';
import { TimePipe } from './pipes/time.pipe';
import { ScorePipe } from './pipes/score.pipe';

@NgModule({
  declarations: [
    ScoreWidgetComponent,
    ClipComponent,
    MeasureUnitPipe,
    TimePipe,
    ScorePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    ScoreWidgetComponent,
    ClipComponent,
    MeasureUnitPipe,
    TimePipe,
    ScorePipe
  ]
})
export class SharedModule { }
