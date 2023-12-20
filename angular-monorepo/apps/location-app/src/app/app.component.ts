import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'angular-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'location-app';

  items: MenuItem[] = [
    {
      label: 'Entities',
      icon: 'pi pi-fw pi-compass',
      items: [
        {
          label: 'Homepage',
          icon: 'pi pi-fw pi-bookmark',
          routerLink: 'entity/homepage',
          command: () => (this.sideMenuVisible = false),
        },
        {
          label: 'List',
          icon: 'pi pi-fw pi-list',
          routerLink: 'entity/list',
          command: () => (this.sideMenuVisible = false),
        },
      ],
    },
    {
      label: 'Dashboards',
      icon: 'pi pi-fw pi-chart-bar',
      items: [
        {
          label: 'Location Dashboard',
          icon: 'pi pi-fw pi-chart-line',
          routerLink: 'dashboards/location',
          command: () => (this.sideMenuVisible = false),
        },
      ],
    },
  ];

  sideMenuVisible = false;
}
