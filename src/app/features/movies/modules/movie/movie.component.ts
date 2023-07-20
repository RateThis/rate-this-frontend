import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MoviesService } from '../../movies.service';
import { Globals } from 'src/app/globals';
import { MovieInfo } from 'src/app/models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  public movieInfo$?: Observable<MovieInfo>;
  public moviesImagesPath?: string;
  public apiKey?: string;
  private _movieId: number = -1;
  private _destroy$ = new Subject<void>();

  constructor(
    private _moviesService: MoviesService,
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.moviesImagesPath = `${this._globals.API_MOVIES.IMAGE_URL}`;
    this.apiKey = this._globals.API_MOVIES.KEY;
    if (isNaN(Number(this._route.snapshot.paramMap.get('id')))) this._router.navigate(['..'], { relativeTo: this._route });
    this._movieId = !isNaN(Number(this._route.snapshot.paramMap.get('id'))) ? +this._route.snapshot.paramMap.get('id')! : -1;
  }

  public ngOnInit(): void {
    this.movieInfo$ = this.getMovieById$();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getMovieById$(): Observable<MovieInfo> {
    return this._moviesService.getMovieById(this._movieId).pipe(
      takeUntil(this._destroy$),
      map((res: any) => this._transformMovie(res))
    );
  }

  private _transformMovie(m: any): MovieInfo {
    return {
      id: m.id,
      title: m.title,
      desc: m.overview,
      date: new Date(`${m.release_date}`),
      score: m.vote_average,
      votes: m.vote_count,
      lang: m.original_language,
      poster: `${this.moviesImagesPath}/w342${m.poster_path}`,
      backdrop: `${this.moviesImagesPath}/w1280${m.backdrop_path}`,
      adult: m.adult,
      original: m.original_title,
      budget: m.budget,
      revenue: m.revenue,
      time: m.runtime,
      genres: Array.from(m.genres).map((obj: any) => obj.name)
    }
  }
}
