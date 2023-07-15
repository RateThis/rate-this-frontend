import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, of, share, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  public userForm!: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.userForm = this._createForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(): void {
    if (this.userForm.invalid) return;
    this._register();
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      name: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      email: ['', [Validators.required, Validators.email]],
      pswd: ['', [Validators.required, Validators.minLength(8)]],
      pswd2: ['', [Validators.required]]
    }, { updateOn: 'blur' });
  }

  private _register(): void {
    const { name, email, pswd } = this.userForm.value;
    this._authService.registerUser(name.trim(), email.trim(), pswd).pipe(
      takeUntil(this._destroy$),
      catchError((err) => {
        return of(false);
      })
    ).subscribe({
      error: (err) => {
        console.log(err);
      },
      next: (isCreated) => {
        if (isCreated) this._router.navigate(['/auth/login']);
      }
    });
  }
}