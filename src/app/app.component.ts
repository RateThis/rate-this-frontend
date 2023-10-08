import { Component } from '@angular/core';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/main.scss', './app.component.scss'],
})
export class AppComponent {
  title = 'RateThis!';

  constructor(private _authService: AuthService) {}

  public isLoggedIn(): boolean {
    return this._authService.isLogged;
  }
}
