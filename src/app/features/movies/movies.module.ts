import { NgModule } from '@angular/core';

import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieModule } from './modules/movie/movie.module';

import { MoviesComponent } from './movies.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieCardComponent
  ],
  imports: [
    MoviesRoutingModule,
    SharedModule,
    MovieModule
  ],
  providers: [ ]
})
export class MoviesModule { }
