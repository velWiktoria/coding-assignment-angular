import {
  EntityListItem,
  EntityService,
} from '@angular-monorepo/entities/data-repository';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'angular-monorepo-entities-feature-list',
  templateUrl: './entities-feature-list.component.html',
  styleUrls: ['./entities-feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureListComponent {
  private loadingSource = new BehaviorSubject(true);
  loading$ = this.loadingSource.asObservable();
  searchControl = new FormControl('');
  items$ = this.searchControl.valueChanges.pipe(
    tap(() => this.loadingSource.next(true)),
    debounceTime(300),
    startWith(''),
    switchMap((search) =>
      this.entityService.getEntityList({ search: search ?? '' })
    ),
    tap(() => this.loadingSource.next(false))
  );

  readonly COLUMNS: { label: string; field: keyof Partial<EntityListItem> }[] =
    [
      {
        label: 'Tracking ID',
        field: 'trackingId',
      },
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Employee type',
        field: 'entityType',
      },
      {
        label: 'Employee status',
        field: 'entityStatus',
      },
      {
        label: 'Is active',
        field: 'isActive',
      },
    ];

  visibleColumnsControl = new FormControl(this.COLUMNS.map((col) => col.field));

  visibleColumns$ = this.visibleColumnsControl.valueChanges.pipe(
    map((cols) => this.COLUMNS.filter((col) => cols?.includes(col.field))),
    startWith(this.COLUMNS)
  );

  constructor(private entityService: EntityService) {}
}
