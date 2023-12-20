import { EntityService } from '@angular-monorepo/entities/data-repository';
import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'angular-monorepo-location-dashboard',
  templateUrl: './location-dashboard.component.html',
  styleUrls: ['./location-dashboard.component.scss'],
})
export class LocationDashboardComponent {
  data$ = this.entityService.getLocationStats();

  constructor(private entityService: EntityService) {}
}
