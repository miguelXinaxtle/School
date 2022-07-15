import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento-seguimiento',
  templateUrl: './mantenimiento-seguimiento.component.html',
  styleUrls: ['./mantenimiento-seguimiento.component.css']
})
export class MantenimientoSeguimientoComponent implements OnInit {

  citas: any;
  partidas: any;
  collapsed = false;
  titulo: string = 'Mis Citas';

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.Grid();
  }

  Grid() {
    this.citas = [
      {
        numeroOrden: "3326",
        marca: "Nissan",
        submarca: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        descripcion: "Cambio de aceite y filtro de aceite",
        monto: "$413.00",
        fecha: "01/11/2022",
        estatus: "En espera",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",


      }, {
        numeroOrden: "3327",
        marca: "Nissan",
        submarca: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        descripcion: "Cambio de aceite y filtro de aceite",
        monto: "$413.00",
        fecha: "01/11/2022",
        estatus: "En espera",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",
      }, {
        numeroOrden: "3328",
        marca: "Nissan",
        submarca: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        descripcion: "Cambio de aceite y filtro de aceite",
        monto: "$413.00",
        fecha: "01/11/2022",
        estatus: "En espera",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",
      }, {
        numeroOrden: "3329",
        marca: "Nissan",
        submarca: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        descripcion: "Cambio de aceite y filtro de aceite",
        monto: "$413.00",
        fecha: "01/11/2022",
        estatus: "En espera",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",
      }, {
        numeroOrden: "3330",
        marca: "Nissan",
        submarca: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        descripcion: "Cambio de aceite y filtro de aceite",
        monto: "$413.00",
        fecha: "01/11/2022",
        estatus: "En espera",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",
      }
    ]

    this.partidas = [
      {
        numeroOrden: "3326",
        cantidad: 1,
        descripcion: "BALATAS DELANTERAS",
        estatus: "APROBADA",
        costo: "$2,459.89",
        totalCosto: "$2,459.89"
      },
      {
        numeroOrden: "3326",
        cantidad: 1,
        descripcion: "SHOE AND LINING",
        estatus: "APROBADA",
        costo: "$2,459.89",
        totalCosto: "$2,459.89"
      },
      {
        numeroOrden: "3326",
        cantidad: 2,
        descripcion: "ROTOR",
        estatus: "APROBADA",
        costo: "$2,459.89",
        totalCosto: "$2,459.89"
      },{
        numeroOrden: "3326",
        cantidad: 1,
        descripcion: "DIAGNOSTICO VEHICULO",
        estatus: "APROBADA",
        costo: "$2,459.89",
        totalCosto: "$2,459.89"
      }
    ]

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

  onTabChanged(e: any) {
    const tab = e.index;

    console.log(tab);
    

    if (tab === 0){
      this.titulo = 'Mis Citas'
    }

    if (tab === 1){
      this.titulo = 'Editar'
    }

    else if(tab === 2){
      this.titulo = 'Cotizaciones'
    }

    if (tab === 3){
      this.titulo = 'Cliente'
    }

    else if(tab === 4){
      this.titulo = 'Órdenes en Proceso/Taller'
    }

    else if(tab === 5){
      this.titulo = 'Órdenes para Entrega'
    }


  }

}
