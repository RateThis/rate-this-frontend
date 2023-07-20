import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/scss/main.scss', './app.component.scss']
})
export class AppComponent {
  title = 'RateThis!';

  public isLoggedIn(): boolean {
    return !!localStorage.getItem("logged");
  }
}
