import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userForm!: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.userForm = this._createForm();
  }

  public onSubmit(): void {
    if (this.userForm.invalid) return;
    this._login();
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      pswd: ['', [Validators.required, Validators.minLength(8)]],
    }, { updateOn: 'blur' });
  }

  private _login(): void {

  }
}
