import { Component, Input } from '@angular/core';

import { MovieInfo } from 'src/app/models/movies';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
})
export class MovieInfoComponent {
  @Input() movie!: MovieInfo;
}
