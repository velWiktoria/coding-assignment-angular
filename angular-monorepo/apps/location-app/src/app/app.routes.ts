import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entity',
  },
  {
    path: 'entity',
    children: [
      {
        path: 'homepage',
        loadChildren: () =>
          import(
            'libs/entities/feature-homepage/src/lib/entities-feature-homepage.module'
          ).then((m) => m.EntitiesFeatureHomepageModule),
      },
      {
        path: 'list',
        loadChildren: () =>
          import(
            'libs/entities/feature-list/src/lib/entities-feature-list.module'
          ).then((m) => m.EntitiesFeatureListModule),
      },
    ],
  },
  {
    path: 'dashboards',
    children: [
      {
        path: 'location',
        loadChildren: () =>
          import(
            'libs/entities/feature-location-dashboard/src/lib/entities-feature-location-dashboard.module'
          ).then((m) => m.EntitiesFeatureLocationDashboardModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
