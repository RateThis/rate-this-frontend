import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import("./features/home/home.module").then((m) => m.HomeModule)
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
