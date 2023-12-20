import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'angular-monorepo-occupancy-chart',
  templateUrl: './occupancy-chart.component.html',
  styleUrls: ['./occupancy-chart.component.scss'],
})
export class OccupancyChartComponent implements OnInit {
  @Input() occupancies: number[] = [];

  public chart: any;

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    this.chart = new Chart('occupancy-chart', {
      type: 'bar',
      data: {
        labels: this.getDateLabels(this.occupancies.length),
        datasets: [
          { label: 'Occupancy for last 7 days', data: this.occupancies },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  getDateLabels(length: number): string[] {
    const today = new Date();
    return new Array(length).fill(0).map((_, index) => {
      const date = new Date();
      date.setDate(today.getDate() - (length - index - 1));
      return date.toLocaleDateString();
    });
  }
}
