import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public userForm!: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.userForm = this._createForm();
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

  }
}