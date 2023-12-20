import {
  EntityDetails,
  EntityService,
} from '@angular-monorepo/entities/data-repository';
import { Component } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, of, switchMap, take, tap } from 'rxjs';
import { diffNameAndIDValidator } from '../../validators/diff-name-and-id.validator';
import { createUniqueNameValidator } from '../../validators/unique-name.validator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'angular-monorepo-entities-feature-details',
  templateUrl: './entities-feature-details.component.html',
  styleUrls: ['./entities-feature-details.component.scss'],
})
export class EntitiesFeatureDetailsComponent {
  form = this.formBuilder.group({
    entityId: this.formBuilder.nonNullable.control('', [Validators.required]),
    editableFields: this.formBuilder.group(
      {
        trackingId: this.formBuilder.nonNullable.control(''),
        name: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required],
          updateOn: 'blur',
        }),
        entityType: this.formBuilder.nonNullable.control(''),
      },
      { validators: [diffNameAndIDValidator] }
    ),
    entityStatus: this.formBuilder.nonNullable.control(''),
    isActive: this.formBuilder.nonNullable.control(true),
    attributes: this.formBuilder.nonNullable.control<string[]>(
      [],
      [Validators.required]
    ),
  });
  loadingSource = new BehaviorSubject(true);
  loading$ = this.loadingSource.asObservable();

  entity$ = this.entityService
    .getEntityDetails(this.route.snapshot.params['id'])
    .pipe(tap((entity) => this.updateForm(entity)));

  types$ = this.entityService.getEntityTypes();

  get editableFields() {
    return this.form.controls.editableFields;
  }

  get nameControl() {
    return this.editableFields.controls.name;
  }

  get typeControl() {
    return this.editableFields.controls.entityType;
  }

  get trackingId() {
    return this.editableFields.controls.trackingId;
  }

  private uniqueNameValidator?: AsyncValidatorFn;

  constructor(
    private formBuilder: FormBuilder,
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.nameControl?.addValidators([Validators.required]);
    this.form.disable();
  }

  enableForm() {
    this.editableFields.enable();
  }

  saveForm() {
    this.editableFields.updateValueAndValidity();
    this.loadingSource.next(true);
    if (this.nameControl.pending) {
      this.nameControl.statusChanges
        .pipe(
          take(1),
          tap((t) => {
            console.log(t);
          }),
          catchError(() => {
            this.loadingSource.next(false);
            return of(null);
          }),
          switchMap((status) =>
            status === 'VALID' ? this.saveEntityPipe : of(null)
          )
        )
        .subscribe();
    } else if (this.editableFields.valid) {
      this.saveEntityPipe.subscribe();
    } else {
      this.loadingSource.next(false);
      this.editableFields.markAllAsTouched();
    }
  }

  private get saveEntityPipe() {
    return this.entityService
      .updateEntity(
        this.editableFields.getRawValue(),
        this.route.snapshot.params['id']
      )
      .pipe(
        catchError(() => {
          this.router.navigate(['..'], { relativeTo: this.route });
          this.messageService.add({
            severity: 'error',
            detail: 'Failed to update employee',
          });
          return of(null);
        }),
        tap((entity) => {
          if (entity) {
            this.editableFields.disable();
            this.updateForm(entity);
            this.messageService.add({
              severity: 'success',
              detail: 'Employee updated',
            });
          }
        })
      );
  }

  private updateForm(entity: EntityDetails) {
    this.loadingSource.next(false);
    this.form.patchValue({ ...entity, editableFields: { ...entity } });
    if (this.uniqueNameValidator) {
      this.nameControl.removeAsyncValidators(this.uniqueNameValidator);
    }
    this.uniqueNameValidator = createUniqueNameValidator(
      this.entityService,
      this.messageService,
      entity.name
    );
    this.nameControl?.addAsyncValidators([this.uniqueNameValidator]);
  }
}
