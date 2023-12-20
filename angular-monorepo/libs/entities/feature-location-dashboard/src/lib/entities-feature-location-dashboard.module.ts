import { EntityService } from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LocationDashboardComponent } from './components/location-dashboard/location-dashboard.component';
import { OccupancyChartComponent } from './components/occupancy-chart/occupancy-chart.component';
import { RouterModule } from '@angular/router';
import { VisitsChartComponent } from './components/visits-chart/visits-chart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LocationDashboardComponent },
    ]),
    ProgressSpinnerModule,
  ],
  declarations: [
    LocationDashboardComponent,
    OccupancyChartComponent,
    VisitsChartComponent,
  ],
  providers: [EntityService],
})
export class EntitiesFeatureLocationDashboardModule {}
