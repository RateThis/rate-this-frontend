import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewsModule } from '../../../reviews/reviews.module';

import { MovieComponent } from './movie.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';

@NgModule({
  declarations: [
    MovieComponent,
    MovieInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReviewsModule
  ]
})
export class MovieModule { }
