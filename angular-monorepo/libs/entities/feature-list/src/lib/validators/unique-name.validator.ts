import { EntityService } from '@angular-monorepo/entities/data-repository';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map, of } from 'rxjs';

export const createUniqueNameValidator = (
  entityService: EntityService,
  currentName: string
): AsyncValidatorFn => {
  return (
    control: AbstractControl<string>
  ): Observable<ValidationErrors | null> =>
    control.value === currentName
      ? of(null)
      : entityService
          .getEntityList({ name: control.value })
          .pipe(map((list) => (list.length ? { uniqueName: true } : null)));
};
