import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Globals } from 'src/app/globals';
import { apiContext } from 'src/app/core/interceptors/api.interceptor';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _apiUrl!: string;

  constructor(private _globals: Globals, private _http: HttpClient) {
    this._apiUrl = `${this._globals.API_URL}/movies` || '';
  }

  public getTopRankedMovies(): Observable<any> {
    return this._http.get<any>(`${this._globals.API_MOVIES.URL}/movie/top_rated`, {
      context: apiContext('movies')
    });
  }
}
