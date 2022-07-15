import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
// import { Workbook } from "exceljs";
import { exportDataGrid } from "devextreme/excel_exporter";

@Component({
  selector: 'app-orden-consulta',
  templateUrl: './orden-consulta.component.html',
  styleUrls: ['./orden-consulta.component.css']
})
export class OrdenConsultaComponent implements OnInit {
  columns: any;
  dataTable: any;
  temp: any;
  @ViewChild('search', { static: false }) search: any;
  ordenes = [
    {
      partida: "DODRAM170081872",
      descripcion: "Mano de obra y refacciones",
      inicio: "01/02/22",
      entrega: "04/02/22",
      cantidad: 1,
      costo: "$1,860.46"
    },
    {
      partida: "DODRAM170081872",
      descripcion: "Mano de obra y refacciones",
      inicio: "01/02/22",
      entrega: "04/02/22",
      cantidad: 1,
      costo: "$1,860.46"
    }
  ]
  collapsed = false;

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };



  constructor() {
  }

  ngOnInit(): void {

    this.Grid();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map((x: any) => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }

  Grid() {
    this.columns = [
      {
        name: 'Partida',
        prop: 'Partida'
      },
      {
        name: 'Descripcion',
        prop: 'Descripcion'
      },
      {
        name: 'Inicio',
        prop: 'Inicio'
      },
      {
        name: 'Entrega',
        prop: 'Entrega'
      },
      {
        name: 'Cantidad',
        prop: 'Cantidad'
      },
      {
        name: 'Costo',
        prop: 'Costo'
      }
    ];

    this.dataTable = [
      { "Partida": "DODRAM170081872", "Descripcion": "Mano de obra y reffacciones", "Inicio": "01/02/22", "Entrega": "04/02/22", "Cantidad": 1, "Costo": 1860.46 },
      { "Partida": "DODRAM170081872", "Descripcion": "Mano de obra y reffacciones", "Inicio": "01/02/22", "Entrega": "04/02/22", "Cantidad": 1, "Costo": 1860.46 }

    ]

    this.temp = this.dataTable;

  }

  updateFilter(event: any) {
    const value = event.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    this.dataTable = this.temp.filter((item: any) => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]].toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
      return false;
    });
  }

  onExporting(e: any) {
    // const workbook = new Workbook();
    // const worksheet = workbook.addWorksheet('Datos');

    // exportDataGrid({
    //   component: e.component,
    //   worksheet,
    //   autoFilterEnabled: true,
    // }).then(() => {
    //   workbook.xlsx.writeBuffer().then((buffer: any) => {
    //     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Datos.xlsx');
    //   });
    // });
    // e.cancel = true;
  }



}