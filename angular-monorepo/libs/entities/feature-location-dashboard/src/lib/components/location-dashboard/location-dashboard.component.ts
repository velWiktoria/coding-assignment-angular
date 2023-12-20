import { EntityService } from '@angular-monorepo/entities/data-repository';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'angular-monorepo-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.scss'],
})
export class LocationDashboardComponent {
  data$ = this.entityService.getLocationStats().pipe(
    catchError(() => {
      this.messageService.add({
        severity: 'error',
        detail: 'Could not load location data',
      });
      return of({
        lastWeekLocationOccupancy: [],
        lastWeekEmployeesVisits: [],
      });
    })
  );

  constructor(
    private entityService: EntityService,
    private messageService: MessageService
  ) {}
}
