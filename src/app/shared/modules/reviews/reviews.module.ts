import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsComponent } from './reviews.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { RateWidgetComponent } from './components/rate-widget/rate-widget.component';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewFormComponent,
    RateWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReviewsComponent,
    ReviewFormComponent
  ]
})
export class ReviewsModule { }
