import {
  EntityDetails,
  EntityService,
} from '@angular-monorepo/entities/data-repository';
import { Component } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, of, switchMap, take, tap } from 'rxjs';
import { diffNameAndIDValidator } from '../../validators/diff-name-and-id.validator';
import { createUniqueNameValidator } from '../../validators/unique-name.validator';

@Component({
  selector: 'angular-monorepo-entities-feature-details',
  templateUrl: './entities-feature-details.component.html',
  styleUrls: ['./entities-feature-details.component.scss'],
})
export class EntitiesFeatureDetailsComponent {
  form = this.formBuilder.group({
    entityId: this.formBuilder.nonNullable.control('', [Validators.required]),
    editableFields: this.formBuilder.group({
      trackingId: this.formBuilder.nonNullable.control(''),
      name: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      entityType: this.formBuilder.nonNullable.control(''),
    }),
    entityStatus: this.formBuilder.nonNullable.control(''),
    isActive: this.formBuilder.nonNullable.control(true),
    attributes: this.formBuilder.nonNullable.control<string[]>(
      [],
      [Validators.required]
    ),
  });

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
    private router: Router
  ) {
    this.nameControl?.addValidators(diffNameAndIDValidator(this.form));
    this.form.disable();
  }

  enableForm() {
    this.editableFields.enable();
  }

  saveForm() {
    (this.nameControl.pending
      ? this.nameControl.statusChanges.pipe(take(1))
      : of('VALID')
    )
      .pipe(
        switchMap((status) => {
          console.log(status);
          return status === 'VALID'
            ? this.entityService.updateEntity(
                this.editableFields.getRawValue(),
                this.route.snapshot.params['id']
              )
            : of(null);
        }),
        catchError(() => {
          this.router.navigate(['..'], { relativeTo: this.route });
          return of(null);
        })
      )
      .subscribe((entity) => {
        if (entity) {
          this.editableFields.disable();
          this.updateForm(entity);
        }
      });
  }

  private updateForm(entity: EntityDetails) {
    this.form.patchValue({ ...entity, editableFields: { ...entity } });
    if (this.uniqueNameValidator) {
      this.nameControl.removeAsyncValidators(this.uniqueNameValidator);
    }
    this.uniqueNameValidator = createUniqueNameValidator(
      this.entityService,
      entity.name
    );
    this.nameControl?.addAsyncValidators([this.uniqueNameValidator]);
  }
}
