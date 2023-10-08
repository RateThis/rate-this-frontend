import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public userForm!: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.userForm = this._createForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(): void {
    if (this.userForm.invalid) return;
    this._login();
  }

  private _createForm(): FormGroup {
    return this._fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        pswd: ['', [Validators.required, Validators.minLength(8)]],
      },
      { updateOn: 'blur' }
    );
  }

  private _login(): void {
    const { email, pswd } = this.userForm.value;
    this._authService
      .authUser(email.trim(), pswd)
      .pipe(
        takeUntil(this._destroy$),
        catchError((err) => {
          return of(false);
        })
      )
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        next: (isAuthed) => {
          if (isAuthed) this._authService.logIn();
        },
      });
  }
}
