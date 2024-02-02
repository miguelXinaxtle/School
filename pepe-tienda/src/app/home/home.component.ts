import { ClienteService } from './../cliente.service';
import { Component, OnInit, inject } from '@angular/core';
import { findIndex, lastValueFrom } from 'rxjs';
import { ProductoService } from './../producto.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsontoxml from "jsontoxml";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ToastModule,FormsModule,DialogModule ,ButtonModule,InputTextModule,TableModule,DropdownModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]
})

export class HomeComponent {
  descripcion=""
  idUsuario=2
  productoList: any[] = []
  productoToBuyList: any[] = []  
  idClienteSelected:any;
  compras: any 
  msg: boolean = false;

  
  constructor(
    private ProductoService:ProductoService,
    private router:Router,
    private ClienteService: ClienteService,
    private messageService: MessageService,
    ){}

  async ngOnInit (): Promise<void>{
    this.comprasCliente()
  }

    showDialog() {
      this.messageService.add({ severity: 'success', summary: 'Aviso', detail: 'Venta Existosa' });
    }

 async productoPorDescripcion() {
    const query = this.descripcion
  const result = this.ProductoService.productoPorDescripcion(query)
  const res: any = await lastValueFrom(result)
  this.productoList = res
  console.log(res)
 }


 addProductToBuy(product: any){
 const idx = this.productoToBuyList.findIndex(item => item.idProducto==product.idProducto)

    if (idx == -1) {
      this.productoToBuyList.push({...product, cantidad: 1}) 
    } else {
      const newCantidad = this.productoToBuyList[idx].cantidad

      this.productoToBuyList[idx] = {...this.productoToBuyList[idx], cantidad: newCantidad + 1}
    }
 }
 
 cleanProductToBuy(product:any){
  const idx = this.productoToBuyList.findIndex(item => item.idProducto==product.idProducto)

  if (idx == -1) {
    this.productoToBuyList.push({...product, cantidad: 1}) 
  } else { 
    const newCantidad = this.productoToBuyList[idx].cantidad

    this.productoToBuyList[idx] = {...this.productoToBuyList[idx], cantidad: newCantidad - 1}
    if (newCantidad == 1){this.productoToBuyList.splice(idx,1)}
  }
 }

  async venderProduct(){
     console.log('idUsuario',this.idUsuario)
     console.log('idCliente',this.idClienteSelected.idCliente)

     const productList = this.productoToBuyList.map((item: any) => ({producto: {id: item.idProducto, cantidad: item.cantidad }}))
     console.log('nueva list productList', productList)
     const productListXml = jsontoxml({ productos: productList });
     console.log('productListXml', productListXml)
     
      const request = {
      Productos: productListXml,
      idUsuario: this.idUsuario,
      idCliente: this.idClienteSelected.idCliente
     }
     console.log(request)
       const result = this.ProductoService.venderProduct(request)
      const res = await lastValueFrom(result)
      console.log(res)
    //const xmlProduct = '<productos><producto><id>39</id></producto><producto><id>37</id></producto></productos>'
    this.showDialog() 
    // this.show()
  }

  async comprasCliente(){
    const result = this.ClienteService.comprasCliente()
    const res = await lastValueFrom(result)
    this.compras = res 
    console.log('compras: ',res)
  }

}

