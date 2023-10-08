import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Globals } from 'src/app/globals';
import { MoviesCollectionType } from 'src/app/models/movies';

import { apiContext } from 'src/app/core/interceptors/api.interceptor';

@Injectable({
  providedIn: 'any',
})
export class MoviesService {

  constructor(private _globals: Globals, private _http: HttpClient) {
    console.log('MoviesService');
  }

  public getMoviesCollection$(type: MoviesCollectionType): Observable<any> {
    return this._http.get<any>(
      `${this._globals.API_MOVIES.URL}/movie/${type}`,
      {
        context: apiContext('movie'),
      }
    );
  }

  public getMovieById$(id: number): Observable<any> {
    return this._http.get<any>(`${this._globals.API_MOVIES.URL}/movie/${id}`, {
      context: apiContext('movie'),
    });
  }
}
