import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { first } from 'rxjs';

@Directive({
  selector: '[match]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchValidatorDirective, multi: true }]
})
export class MatchValidatorDirective implements Validator {
  @Input('match') matchControlName!: string;

  constructor() { }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const controlToMatch = control.root.get(this.matchControlName);
    if (controlToMatch?.invalid) return null;

    if (controlToMatch) {
      controlToMatch.valueChanges.pipe(first()).subscribe(() => {
        control.updateValueAndValidity();
      });
    }

    return controlToMatch && control.value === controlToMatch.value ? null : { 'match': true };
  }
}
