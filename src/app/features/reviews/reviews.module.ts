import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ReviewsComponent } from './reviews.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { RateWidgetComponent } from './components/rate-widget/rate-widget.component';
import { AutoHeightDirective } from './directives/auto-height.directive';
import { ReviewCardComponent } from './components/review-card/review-card.component';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewFormComponent,
    RateWidgetComponent,
    AutoHeightDirective,
    ReviewCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ReviewsComponent,
    ReviewFormComponent
  ]
})
export class ReviewsModule { }
