import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
