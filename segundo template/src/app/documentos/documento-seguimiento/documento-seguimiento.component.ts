import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documento-seguimiento',
  templateUrl: './documento-seguimiento.component.html',
  styleUrls: ['./documento-seguimiento.component.css']
})
export class DocumentoSeguimientoComponent implements OnInit {
  collapsed = false;
  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  polizaVigencia = null
  displayedColumns = ['documento', 'fechaRegistro', 'fechVencimiento','ver','agregarEditar','Estado'];
  dataSource = [
    {documento: "Verificación", fechaRegistro: "12 Diciembre, 21", fechVencimiento: "12 Diciembre, 22", ver:"", agregarEditar:"", estado:"VIGENTE",backGroundColor:"#fdf1e9"},
    {documento: "Tarjeta de circulación", fechaRegistro: "12 Diciembre, 21", fechVencimiento: "12 Diciembre, 22", ver:"", agregarEditar:"", estado:"VENCIDA",backGroundColor:""},
    {documento: "Tenencia", fechaRegistro: "12 Diciembre, 21", fechVencimiento: "12 Diciembre, 22", ver:"", agregarEditar:"", estado:"VIGENTE",backGroundColor:"#fdf1e9"},
    {documento: "Póliza de seguro", fechaRegistro: "12 Diciembre, 21", fechVencimiento: "12 Diciembre, 22", ver:"", agregarEditar:"", estado:"VIGENTE",backGroundColor:""},
    {documento: "Placas", fechaRegistro: "12 Diciembre, 21", fechVencimiento: "12 Diciembre, 22", ver:"", agregarEditar:"", estado:"VIGENTE",backGroundColor:"#fdf1e9"},
    
  ];

  open() {
    // const dialogRef = this.dialog.open(ModalDocumentoComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  onExporting(e: any) {

  }

}
