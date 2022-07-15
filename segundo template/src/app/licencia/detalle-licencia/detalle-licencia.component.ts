import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-licencia',
  templateUrl: './detalle-licencia.component.html',
  styleUrls: ['./detalle-licencia.component.scss']
})
export class DetalleLicenciaComponent implements OnInit {

  instrucciones: any = [
    {
      "parrafo":"Ingresa a la página de la Secretaría de Administración y Finanzas de la Ciudad de México, en la opción “Tránsito”, selecciona “Licencia A automovilista por 3 años (expedición y reposición)” e imprime tu línea de captura (Consulta tu formato aquí)",
      "hipertextos":[
        {"link":"https:www.finanzas.cdmx.gob.mx"}
      ],
      "opciones":[]
    },
    {
      "parrafo":"Realiza tu pago en los Centros de Servicio de la Secretaría de Administración y Finanzas o Auxiliares de pago autorizados (considera que en algunos establecimientos la aplicación de tu pago se verá reflejado hasta 72 horas después), conserva el comprobante de pago original y la línea de captura",
      "hipertextos":[],
      "opciones":[]
    },
    {
      "parrafo":"Saca tu cita en alguno de los Módulos de Control Vehicular y Licencias. O bien, acude a uno de los Centros de Servicio de Tesorería de tu preferencia. Recuerda que, sin cita, no será posible atenderte",
      "hipertextos":[
        {"link":"https://tics.finanzas.cdmx.gob.mx/citas/public/citas"}
      ],
      "opciones":[]
    },
    {
      "parrafo":"Acude con los documentos originales para realizar tu trámite a los Centros de Servicio de la Secretaría de Administración y Finanzas, que hayas elegido en el momento de generar tu cita (solo se te atenderá en él). Deberás acudir puntual y sin acompañantes, con cubrebocas, respetando los protocolos de sanidad y sana distancia",
      "hipertextos":[],
      "opciones":[]
    },
    {
      "parrafo":"En la ventanilla, se recibirá, revisará, cotejará y registrará la documentación, y la persona que te atienda emitirá y entregará la hoja de validación de datos para tu firma de conformidad con la información contenida",
      "hipertextos":[],
      "opciones":[]
    },
    {
      "parrafo":"Finalmente, se entregará a la persona solicitante su licencia",
      "hipertextos":[],
      "opciones":[]
    }
  ]

  documentos: any = [
    {
      "parrafo":"Identificación oficial, original, vigente con fotografía con CURP, datos personales legibles, sin tachaduras ni enmendaduras de cualquiera de las siguientes opciones:",
      "hipertextos":[],
      "opciones":[
        {
          "documento":"Credencial para votar, vigente"
        },
        {
          "documento":"Pasaporte de los Estados Unidos Mexicanos, vigente"
        },
        {
          "documento":"Cédula profesional con fotografía"
        },
        {
          "documento":"Cartilla del Servicio Militar Nacional (con más de 10 años de emisión debe de estar resellada)"
        },
        {
          "documento":"Personas extranjeras: comprobar estancia legal en el país mediante visa de residencia temporal o permanente (anteriormente FM2)"
        },
        {
          "documento":"* En ninguna de las opciones será admitida la certificación hecha por Notario Público"
        }
      ]
    },
    {
      "parrafo":"Comprobante de domicilio de la Ciudad de México o del Estado de México, con datos completos del domicilio (calle, número, colonia, alcaldía, código postal); del ejercicio fiscal vigente, y con una antigüedad máxima de tres meses a partir del último día de facturación o, en su caso, el del último bimestre:",
      "hipertextos":[],
      "opciones":[]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  irPagina(url: string)
  {
    window.open(url,"_blank")
  }

}
