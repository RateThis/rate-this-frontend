import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';

import { MoviesService } from './movies.service';
import { Globals } from 'src/app/globals';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  public topRatedMovies$?: Observable<Movie[]>;
  public moviesPostersPath?: string;
  public apiKey?: string;
  private _destroy$ = new Subject<void>();

  constructor(private _moviesService: MoviesService, private _globals: Globals) {
    this.moviesPostersPath = `${this._globals.API_MOVIES.IMAGE_URL}/w200`;
    this.apiKey = this._globals.API_MOVIES.KEY;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngOnInit(): void {
    this.topRatedMovies$ = this.getTopRankedMovies$();
  }

  public getTopRankedMovies$(): Observable<Movie[]> | any {
    return this._moviesService.getTopRankedMovies().pipe(
      takeUntil(this._destroy$),
      map((res: any) => res.results.map(this._transformMovie.bind(this)))
    );
  }

  private _transformMovie(m: any): Movie {
    return {
      id: m.id,
      title: m.title,
      desc: m.overview,
      date: new Date(`${m.release_date}`),
      score: m.vote_average,
      votes: m.vote_count,
      genres: m.genre_ids,
      lang: m.original_language,
      poster: `${this.moviesPostersPath + m.poster_path}`,
      adult: m.adult
    }
  }
}
