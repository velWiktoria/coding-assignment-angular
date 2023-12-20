import { EntityService } from '@angular-monorepo/entities/data-repository';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable, catchError, map, of, tap } from 'rxjs';

export const createUniqueNameValidator = (
  entityService: EntityService,
  messageService: MessageService,
  currentName: string
): AsyncValidatorFn => {
  return (
    control: AbstractControl<string>
  ): Observable<ValidationErrors | null> =>
    control.value === currentName
      ? of(null)
      : entityService.getEntityList({ name: control.value }).pipe(
          catchError(() => {
            messageService.add({
              severity: 'error',
              detail: 'Cannot check the name availability',
            });
            return of([]);
          }),
          map((list) => (list.length ? { uniqueName: true } : null))
        );
};
