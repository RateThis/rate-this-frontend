import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule { }
