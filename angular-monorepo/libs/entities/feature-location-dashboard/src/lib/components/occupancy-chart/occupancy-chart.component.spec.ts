import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccupancyChartComponent } from './occupancy-chart.component';

describe('OccupancyChartComponent', () => {
  let component: OccupancyChartComponent;
  let fixture: ComponentFixture<OccupancyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OccupancyChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupancyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
