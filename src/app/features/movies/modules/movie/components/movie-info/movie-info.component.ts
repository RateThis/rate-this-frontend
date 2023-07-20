import { Component, Input } from '@angular/core';

import { MovieInfo } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent {
  @Input() movie!: MovieInfo;

  public parseTime(minutes: number): string {
    const m: number = minutes % 60;
    const h: number = (minutes - m) / 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  }

  public parseScore(score: number): string {
    return `${score.toFixed(1)}` == '10.0' ? '10/10' : `${score.toFixed(1)}/10`;
  }

}
