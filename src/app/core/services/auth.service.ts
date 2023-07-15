import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiUrl!: string;

  constructor(private _globals: Globals, private _http: HttpClient, private _router: Router) {
    this._apiUrl = `${this._globals.API_URL}/auth` || '';
  }

  public authUser(email: string, password: string): Observable<boolean> {
    return this._http.post<boolean>(`${this._apiUrl}/login`, { email: email, password: password }, {
      withCredentials: true
    });
  }

  public registerUser(name: string, email: string, password: string): Observable<boolean> {
    return this._http.post<boolean>(`${this._apiUrl}/register`, { name: name, email: email, password: password }, {
      withCredentials: true
    });
  }

  public logout(): void {
    localStorage.clear();
    this._router.navigate(['/auth']);
  }
}
