import {
  EntityListItem,
  EntityService,
  LocalStorageService,
} from '@angular-monorepo/entities/data-repository';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

type Column = {
  label: string;
  field: keyof Partial<EntityListItem>;
  moveToDetails?: boolean;
};

@Component({
  selector: 'angular-monorepo-entities-feature-list',
  templateUrl: './entities-feature-list.component.html',
  styleUrls: ['./entities-feature-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesFeatureListComponent {
  private loadingSource = new BehaviorSubject(true);
  loading$ = this.loadingSource.asObservable();
  searchControl = new FormControl(this.getSearchFromLocalStorage());
  items$ = this.searchControl.valueChanges.pipe(
    tap((search) => {
      this.loadingSource.next(true);
      this.localStorageService.saveData('entity-list-search', search);
    }),
    debounceTime(300),
    startWith(this.getSearchFromLocalStorage()),
    switchMap((search) =>
      this.entityService.getEntityList({ search: search ?? '' })
    ),
    catchError(() => {
      this.messageService.add({
        severity: 'error',
        detail: 'Failed to load employees list',
      });
      return of([]);
    }),
    tap(() => this.loadingSource.next(false))
  );

  readonly COLUMNS: Column[] = [
    {
      label: 'Name',
      field: 'name',
      moveToDetails: true,
    },
    {
      label: 'Tracking ID',
      field: 'trackingId',
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

  visibleColumnsControl = new FormControl(
    this.getColumnsFromLocalStorage().map((col) => col.field)
  );

  visibleColumns$ = this.visibleColumnsControl.valueChanges.pipe(
    map((cols) => this.COLUMNS.filter((col) => cols?.includes(col.field))),
    tap((cols) => {
      this.localStorageService.saveData('entity-list-visible-columns', cols);
    }),
    startWith(this.getColumnsFromLocalStorage())
  );

  constructor(
    private entityService: EntityService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService
  ) {}

  private getColumnsFromLocalStorage(): Column[] {
    return (
      (this.localStorageService.retrieveData(
        'entity-list-visible-columns'
      ) as Column[]) ?? this.COLUMNS
    );
  }

  private getSearchFromLocalStorage(): string {
    return (
      (this.localStorageService.retrieveData('entity-list-search') as string) ??
      ''
    );
  }
}
