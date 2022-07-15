import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-multa',
  templateUrl: './principal-multa.component.html',
  styleUrls: ['./principal-multa.component.scss']
})
export class PrincipalMultaComponent implements OnInit {

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
