import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntitiesFeatureDetailsComponent } from './entities-feature-details.component';

describe('EntitiesFeatureDetailsComponent', () => {
  let component: EntitiesFeatureDetailsComponent;
  let fixture: ComponentFixture<EntitiesFeatureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitiesFeatureDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesFeatureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
