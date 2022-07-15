import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-tenencia',
  templateUrl: './principal-tenencia.component.html',
  styleUrls: ['./principal-tenencia.component.scss']
})
export class PrincipalTenenciaComponent implements OnInit {

  mostrarDetalle :boolean = false;
  atras = '<'
  constructor() { }

  ngOnInit(): void {
  }

  irDetalleMulta(){
    this.mostrarDetalle = true;
  }

  regresar(valor:boolean){
    this.mostrarDetalle = valor;
  }

}
