import { EntityService } from '@angular-monorepo/entities/data-repository';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { EntitiesFeatureDetailsComponent } from './components/entities-feature-details/entities-feature-details.component';
import { EntitiesFeatureListComponent } from './components/entities-feature-list/entities-feature-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: EntitiesFeatureListComponent },
      { path: ':id', component: EntitiesFeatureDetailsComponent },
    ]),
    InputTextModule,
    TableModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    ChipsModule,
    DropdownModule,
  ],
  declarations: [EntitiesFeatureListComponent, EntitiesFeatureDetailsComponent],
  providers: [EntityService],
})
export class EntitiesFeatureListModule {}
