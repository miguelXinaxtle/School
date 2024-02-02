import { findIndex, lastValueFrom } from 'rxjs';
import { ProductoService } from './../producto.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProvedorService } from '../provedor.service';
import { DepartamentoService } from '../departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormsModule,CommonModule,InputTextModule,InputNumberModule,DropdownModule,ButtonModule,CardModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
[x: string]: any;
 
  idProducto:  string | null
  provedorList: any;
  idProvedorSelected:any
  departamentoList: any;
  idDepartamentoSelected: any
  descripcion="";
  costo="";
  minimoexistencia="";
  precio="";
  cambio:any

  constructor(
  private productoService:ProductoService,
  private provedorService:ProvedorService,
  private departamentoService:DepartamentoService,
  private route:ActivatedRoute,
  )
  {
    this.idProducto = this.route.snapshot.paramMap.get('idProducto')
    console.log(this.idProducto)
  }

  async ngOnInit(): Promise<void> {
    console.log("idProduct",this.idProducto)

    const result = this.productoService.getProducto();

    const res:any = await lastValueFrom(result)
    console.log('rees',res)
    const idx = res.findIndex((item:any)=> item.idProducto == this.idProducto)
    console.log('res',res[idx])
    this.cambio = res[idx]
    console.log('indice', this.cambio)

    this.getProvedorList()
    this.getDepartamentoList()
  }


// async mostrarProducto(){
//   const result = this.productoService.getProducto();
//   console.log(result)
//   const res:any = await lastValueFrom(result)
//   console.log(res[res])
//   this.productos[0] = res.find((item: any) => item.idProducto = this.idProducto)
//   console.log('productos',this.productos[0])
// }

  async getProvedorList(){
    const result = this.provedorService.getProvedor()
    const res = await lastValueFrom(result)
    this.provedorList = res
    console.log(this.provedorList)
  }

  async getDepartamentoList(){
    const result = this.departamentoService.getDepartamento()
    const res = await lastValueFrom(result)
    this.departamentoList = res
    console.log(res)
  }

  update(){
    console.log('Producto con cambios: ',this.cambio)
    console.log('departamento:',this.idDepartamentoSelected.idDepartamento)
    console.log('provedor:',this.idProvedorSelected.idProvedor)
  }

   async actualizarProduct(idProducto:number){
    console.log(idProducto)
    console.log(this.idProvedorSelected.idProvedor)
    console.log(this.idDepartamentoSelected.idDepartamento)
    console.log(this.cambio.descripcion)
    console.log(this.cambio.costo)
    console.log(this.cambio.precio)
    console.log(this.cambio.minimoexistencia)
  
    const request = {
      idProducto: idProducto,
      idProvedorProducto: this.idProvedorSelected.idProvedor,
      idDepartamentoProducto: this.idDepartamentoSelected.idDepartamento,
      descripcionProducto: this.cambio.descripcion,
      costoProducto: this.cambio.costo,
      precioProducto: this.cambio.precio,
      minimoexistenciaProducto: this.cambio.minimoexistencia
    }
    console.log(request)
     const result = this.productoService.crearProducto(request)
    const res = await lastValueFrom(result)
    console.log(res)
   }  
    

}
