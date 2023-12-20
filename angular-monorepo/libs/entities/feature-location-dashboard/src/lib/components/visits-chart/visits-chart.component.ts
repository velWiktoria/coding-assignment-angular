import { EmployeeVisits } from '@angular-monorepo/entities/data-repository';
import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'angular-monorepo-visits-chart',
  templateUrl: './visits-chart.component.html',
  styleUrls: ['./visits-chart.component.scss'],
})
export class VisitsChartComponent implements OnInit {
  @Input() visits: EmployeeVisits[] = [];

  public chart: any;

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    this.chart = new Chart('visits-chart', {
      type: 'pie',
      data: {
        labels: this.visits.map((v) => v.name),
        datasets: [
          {
            label: 'Top visits in last 7 days',
            data: this.visits.map((v) => v.visits),
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'right',
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
