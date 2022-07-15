import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../shared.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  citas: any;
  partidas: any;
  collapsed = false;

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };
  
  constructor(
    private sharedService:SharedService, 
    private _formBuilder: FormBuilder
  ) 
  { }


  ngOnInit(): void {
    this.sharedService.setTituloHeader('Historial');
    this.Grid();
  }

  Grid() {
    this.citas = [
      {
        numeroOrden: "3326",
        auto: "Ford Escape - Diego",
        modelo: "2010",
        placa: "611XYT",
        citas: "Servicio 10,000 kms",
        monto: "$413.00",
        fecha: "01/11/2022",
        estado: "VIGENTE",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",


      }, {
        numeroOrden: "3327",
        auto: "Nissan Sentra -Alejandro",
        subauto: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        citas: "Pago de tenencia",
        monto: "$516.00",
        fecha: "01/09/2022",
        estado: "VENCIDA",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",
      }, {
        numeroOrden: "3328",
        auto: "Toyota Rav4 - Pablo",
        subauto: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        citas: "Pago de verificación",
        monto: "$1020.00",
        fecha: "21/08/2022",
        estado: "VIGENTE",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",
      }, {
        numeroOrden: "3329",
        auto: "VW Jetta - Jose",
        subauto: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        citas: "Cambio de llantas",
        monto: "$6,800.00",
        fecha: "01/07/2022",
        estado: "VIGENTE",
        tiempoTaller: "12:02:23",
        direccionTaller: "Reforma 39",
        vin:"N61100WKJ11XYT",
        tiempoEspera:"2 días",
        recoger:"Av. San Bernabé 282",
      }, {
        numeroOrden: "3330",
        auto: "Hiunday Creta - Citlalli",
        subauto: "Versa",
        version: "Sense",
        modelo: "2010",
        placa: "611XYT",
        citas: "Mantenimiento básico",
        monto: "$950.00",
        fecha: "05/16/2022",
        estado: "VENCIDA",
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
        citas: "BALATAS DELANTERAS",
        estado: "APROBADA",
        costo: "$2,459.89",
        totalCosto: "$2,459.89"
      },
      {
        numeroOrden: "3326",
        cantidad: 1,
        citas: "SHOE AND LINING",
        estado: "APROBADA",
        costo: "$2,459.89",
        totalCosto: "$2,459.89"
      },
      {
        numeroOrden: "3326",
        cantidad: 2,
        citas: "ROTOR",
        estado: "APROBADA",
        costo: "$2,459.89",
        totalCosto: "$2,459.89"
      },{
        numeroOrden: "3326",
        cantidad: 1,
        citas: "DIAGNOSTICO VEHICULO",
        estado: "APROBADA",
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
}
