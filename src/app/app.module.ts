import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from './core/core.module';

import { Globals } from './globals';

import { AppComponent } from './app.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
    canMatch: [loginGuard]
  },
  {
    path: 'home',
    loadChildren: () =>
      import("./features/home/home.module").then((m) => m.HomeModule),
    canMatch: [authGuard]
  },
  {
    path: 'movies',
    loadChildren: () =>
      import("./features/movies/movies.module").then((m) => m.MoviesModule),
    canMatch: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
