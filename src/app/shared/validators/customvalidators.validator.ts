import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {

  static username(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value as string;

      if (!value) {
        return null;
      }

      return value.includes(' ')
        ? { username: true }
        : null;
    };
  }

}
