import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexMarkers, ApexTheme
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  title?: ApexTitleSubtitle | any;
  stroke?: ApexStroke | any;
  fill?: ApexFill | any;
  markers?: ApexMarkers | any;
  xaxis?: ApexXAxis | any;
  theme?: ApexTheme | any;
};

@Component({
  selector: 'app-comportamiento',
  templateUrl: './comportamiento.component.html',
  styleUrls: ['./comportamiento.component.css']
})
export class ComportamientoComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Series Blue",
          data: [80, 50, 30, 40, 100, 20]
        },
        {
          name: "Series Green",
          data: [20, 30, 40, 80, 20, 80]
        },
        {
          name: "Series Orange",
          data: [44, 76, 78, 13, 43, 10]
        }
      ],
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      title: {
        text: "Comportamiento de conducción"
      },
      stroke: {
        width: 0
      },
      fill: {
        opacity: 0.4
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: ["Giro", "Aceleración", "Frenado", "Velocidad", "Ralenti", "Fatiga"]
      },
      theme: {
        mode: 'light',
        palette: 'palette1',
        monochrome: {
          enabled: true,
          color: '#FB3648',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      }
    };
  }

  ngOnInit(): void {
  }

}
