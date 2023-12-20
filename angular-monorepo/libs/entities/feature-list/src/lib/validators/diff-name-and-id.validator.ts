import { AbstractControl, ValidationErrors } from '@angular/forms';

export const diffNameAndIDValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const name = control.get('name');
  const trackingId = control.get('trackingId');
  return name && trackingId && name.value === trackingId.value
    ? { diffNameAndID: true }
    : null;
};
