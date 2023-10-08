import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _endPoint!: string;

  constructor(private _globals: Globals, private _http: HttpClient) {
    this._endPoint = `${this._globals.API_URL}/user` || '';
  }

  public getUserInfo$(id: number): Observable<any> {
    return this._http.get<any>(`${this._endPoint}/${id}`);
  }
}
