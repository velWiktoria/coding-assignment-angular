import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomepageComponent }]),
  ],
  declarations: [HomepageComponent],
  exports: [HomepageComponent],
})
export class EntitiesFeatureHomepageModule {}
