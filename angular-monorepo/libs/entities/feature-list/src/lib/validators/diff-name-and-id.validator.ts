import {
  FormGroup,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

export const diffNameAndIDValidator =
  (group: FormGroup): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const trackingId = group.get('trackingId');
    return control && trackingId && control.value === trackingId.value
      ? { diffNameAndID: true }
      : null;
  };
