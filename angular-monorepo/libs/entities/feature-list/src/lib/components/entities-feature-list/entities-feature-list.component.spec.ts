import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntitiesFeatureListComponent } from './entities-feature-list.component';

describe('EntitiesFeatureListComponent', () => {
  let component: EntitiesFeatureListComponent;
  let fixture: ComponentFixture<EntitiesFeatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitiesFeatureListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesFeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
