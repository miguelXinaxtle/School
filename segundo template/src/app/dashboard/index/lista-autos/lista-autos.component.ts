import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  legend: ApexLegend | any;
  grid: ApexGrid | any;
};


@Component({
  selector: 'app-lista-autos',
  templateUrl: './lista-autos.component.html',
  styleUrls: ['./lista-autos.component.css']
})
export class ListaAutosComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [6,2,8,4,3,8,1,3,6,5,9]
        },
      ],
      chart: {
        type: "bar",
        width: 220,
		height:120,
        toolbar:{
            show:false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['#363062']
      },
      xaxis: {
        labels: {
          show: false,
        }
      },
      yaxis: {
         show: false,
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: false,
      },
      grid: {
          show: false,
      }

    };
  }
  
  
  
  marketHolding = [
        {
          rank: "#1",
          rank_class: "bgl-primary",
          coin_image: "assets/images/misautos/mazda.jpg",
          name: "Mazda de Luis",
          price: "$11,911.48",
          change: "2,54%",
          volume: "7,631",
          variation: "4%",
          variation_class: "fa-caret-up text-success",
        },
        {
          rank: "#2",
          rank_class: "bgl-primary",
          coin_image: "assets/images/misautos/toyota.png",
          name: "RAV4 José",
          price: "$11,911.48",
          change: "2,54%",
          volume: "45,999",
          variation: "0.5%",
          variation_class: "fa-caret-up text-success",
        },
        {
          rank: "#3",
          rank_class: "bgl-primary",
          coin_image: "assets/images/misautos/toyota_siena.png",
          name: "Sienna Mamá",
          price: "$11,911.48",
          change: "2,54%",
          volume: "12,083",
          variation: "0.1%",
          variation_class: "fa-caret-up text-success",
        },
    {
      rank: "#1",
      rank_class: "bgl-primary",
      coin_image: "assets/images/misautos/mazda.jpg",
      name: "Mazda Manuel",
      price: "$11,911.48",
      change: "2,54%",
      volume: "1,231",
      variation: "1%",
      variation_class: "fa-caret-up text-success",
    }
  ];
  
  ngOnInit(): void {
  }

}
