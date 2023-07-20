import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, map, takeUntil } from 'rxjs';

import { Globals } from 'src/app/globals';
import { MoviesService } from './movies.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  public pageSize: number = 6;
  public topRatedMovies$?: Observable<Movie[]>;
  public nowPlayingMovies$?: Observable<Movie[]>;
  public popularMovies$?: Observable<Movie[]>;
  public moviesImagesPath?: string;
  public apiKey?: string;
  private _destroy$ = new Subject<void>();

  constructor(
    private _moviesService: MoviesService,
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.moviesImagesPath = `${this._globals.API_MOVIES.IMAGE_URL}/w200`;
    this.apiKey = this._globals.API_MOVIES.KEY;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngOnInit(): void {
    this.topRatedMovies$ = this.getMoviesList$('top');
    this.popularMovies$ = this.getMoviesList$('pop');
    this.nowPlayingMovies$ = this.getMoviesList$('now');
  }

  public getMoviesList$(type: 'top' | 'pop' | 'now'): Observable<Movie[]> {
    const observable = type === 'top' ? this._moviesService.getTopRankedMovies()
      : type === 'pop' ? this._moviesService.getPopularMovies() : this._moviesService.getNowPlayingMovies();
    return observable.pipe(
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
      poster: `${this.moviesImagesPath + m.poster_path}`,
      adult: m.adult
    }
  }
}
