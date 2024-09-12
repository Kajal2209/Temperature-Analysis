import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-view-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css'],
})
export class ViewDataComponent implements OnInit {
  @Output() back = new EventEmitter<void>();
  chart: any;

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dataService.data$.subscribe((data) => {
      console.log('Data received:', data); // Log data to verify
      this.updateChart(data);
    });
  }

  updateChart(data: { temperature: string; datetime: string }[]) {
    const temperatures = data.map((entry) => entry.temperature);
    const datetimes = data.map((entry) => entry.datetime);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: datetimes,
        datasets: [
          {
            label: 'Temperature',
            data: temperatures,
            borderColor: 'green', // Line color
            borderWidth: 2,
            backgroundColor: 'red', // Point color
            pointBackgroundColor: 'red', // Point color
            pointBorderColor: 'red', // Point border color
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
            },
            grid: {
              color: 'green', // Grid color
            },
            ticks: {
              color: 'green', // Tick color
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'green', // Grid color
            },
            ticks: {
              color: 'green', // Tick color
            },
          },
        },
      },
    });
  }

  onBack() {
    this.back.emit(); // Emit the event to notify parent component
  }
}
