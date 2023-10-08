import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Globals } from 'src/app/globals';
import { MovieInfo } from 'src/app/models/movies';

import { MoviesService } from '../../movies.service';
import { Entity } from 'src/app/models/review';
import { ReviewService } from 'src/app/features/reviews/review.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  public movieInfo$?: Observable<MovieInfo>;
  // private _apiKey?: string;
  public movieId!: number;
  private _movieImagesPath?: string;
  private _destroy$ = new Subject<void>();

  constructor(
    private _moviesService: MoviesService,
    private _reviewsService: ReviewService,
    private _globals: Globals,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._movieImagesPath = `${this._globals.API_MOVIES.IMAGE_URL}`;
    // this._apiKey = this._globals.API_MOVIES.KEY;
    this._verifyRoute();
    this.movieInfo$ = this._getMovieById$();
  }

  public ngOnInit(): void {
    this._reviewsService.updateEntity(this.entity);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public get entity(): Entity {
    return { id: String(this.movieId), type: 'movie' };
  }

  private _verifyRoute(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    isNaN(id)
      ? this._router.navigate(['..'], { relativeTo: this._route })
      : (this.movieId = id);
  }

  private _getMovieById$(): Observable<MovieInfo> {
    return this._moviesService.getMovieById$(this.movieId).pipe(
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
      poster: `${this._movieImagesPath}/w342${m.poster_path}`,
      backdrop: `${this._movieImagesPath}/w1280${m.backdrop_path}`,
      adult: m.adult,
      original: m.original_title,
      budget: m.budget,
      revenue: m.revenue,
      time: m.runtime,
      genres: Array.from(m.genres).map((obj: any) => obj.name),
    };
  }
}
