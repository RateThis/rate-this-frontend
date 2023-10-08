import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUrl!: string;
  private _isLoggedKey: string = 'isLogged';

  constructor(
    private _globals: Globals,
    private _http: HttpClient,
    private _router: Router
  ) {
    this._authUrl = `${this._globals.API_URL}/auth`;
    this._isLoggedKey = this._globals.IS_LOGGED_KEY;
  }

  public authUser(email: string, password: string): Observable<boolean> {
    return this._http.post<boolean>(
      `${this._authUrl}/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );
  }

  public registerUser(
    name: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this._http.post<boolean>(
      `${this._authUrl}/register`,
      { name, email, password },
      {
        withCredentials: true,
      }
    );
  }

  public get isLogged(): boolean {
    return localStorage.getItem(this._isLoggedKey) === 'true';
  }

  public logIn(): void {
    localStorage.setItem(this._isLoggedKey, 'true');
    this._router.navigate(['/']);
  }

  public logOut(): void {
    localStorage.removeItem(this._isLoggedKey);
    this._router.navigate(['/auth']);
  }
}
