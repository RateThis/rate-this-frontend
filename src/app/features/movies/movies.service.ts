import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Globals } from 'src/app/globals';
import { apiContext } from 'src/app/core/interceptors/api.interceptor';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _globals: Globals, private _http: HttpClient) { }

  public getTopRankedMovies(): Observable<any> {
    return this._http.get<any>(`${this._globals.API_MOVIES.URL}/movie/top_rated`, {
      context: apiContext('movies')
    });
  }

  public getNowPlayingMovies(): Observable<any> {
    return this._http.get<any>(`${this._globals.API_MOVIES.URL}/movie/now_playing`, {
      context: apiContext('movies')
    });
  }

  public getPopularMovies(): Observable<any> {
    return this._http.get<any>(`${this._globals.API_MOVIES.URL}/movie/popular`, {
      context: apiContext('movies')
    });
  }

  public getMovieById(id: number): Observable<any> {
    return this._http.get<any>(`${this._globals.API_MOVIES.URL}/movie/${id}`, {
      context: apiContext('movies')
    });
  }
}
