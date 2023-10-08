import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';

import { Globals } from 'src/app/globals';
import { Movie, MoviesCollectionType } from 'src/app/models/movies';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  public pageSize: number = 6;
  public topRatedMovies$?: Observable<Movie[]>;
  public nowPlayingMovies$?: Observable<Movie[]>;
  public popularMovies$?: Observable<Movie[]>;
  public movieImagesPath?: string;
  public apiKey?: string;
  private _destroy$ = new Subject<void>();

  constructor(
    private _moviesService: MoviesService,
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.movieImagesPath = `${this._globals.API_MOVIES.IMAGE_URL}/w200`;
    this.apiKey = this._globals.API_MOVIES.KEY;
  }

  public ngOnInit(): void {
    this.topRatedMovies$ = this.getMoviesCollection$(MoviesCollectionType.Top);
    this.popularMovies$ = this.getMoviesCollection$(
      MoviesCollectionType.Popular
    );
    this.nowPlayingMovies$ = this.getMoviesCollection$(
      MoviesCollectionType.Now
    );
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getMoviesCollection$(type: MoviesCollectionType): Observable<Movie[]> {
    return this._moviesService.getMoviesCollection$(type).pipe(
      takeUntil(this._destroy$),
      map((res: any) => res.results.map(this._transformMovie.bind(this)))
    );
  }

  public onCardClick(movieId: number): void {
    this._router.navigate([movieId], { relativeTo: this._route });
  }

  private _transformMovie(m: any): Movie {
    return {
      id: m.id,
      title: m.title,
      date: new Date(`${m.release_date}`),
      score: m.vote_average,
      lang: m.original_language,
      poster: `${this.movieImagesPath + m.poster_path}`,
      adult: m.adult,
    };
  }
}
