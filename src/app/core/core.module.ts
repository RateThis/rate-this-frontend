import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiInterceptor } from './interceptors/api.interceptor';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
