import { ProvedorService } from './../provedor.service';
import { DepartamentoService } from './../departamento.service';
import { lastValueFrom } from 'rxjs';
import { ProductoService } from './../producto.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule,ToastModule,InputTextModule,CommonModule,TableModule,ButtonModule,InputNumberModule, DialogModule,DropdownModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss',
  providers: [MessageService]
})
export class InventarioComponent {
  
  productSelected: any;
  productos: any []=[]
  cantidad=0;
  idProducto:any ;
  visible: boolean = false
  visto: boolean = false
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
    private ProductoService:ProductoService,
    private router:Router,
    private departamentoService: DepartamentoService,
    private provedorService:ProvedorService,
    private messageService:MessageService
    ){
  }

  async ngOnInit (): Promise<void>{
    this.mostrarProducto()
    this.getDepartamentoList()
    this.getProvedorList()
  }

  showDialog(){
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Existencias Agregadas' });
  }

  dialog(){
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Producto Editado' });
  }

  eliminacion(){
    this.messageService.add({ severity: 'success', summary: '!Aviso¡', detail: 'Producto Eliminado' });
  }

    async mostrarProducto(){
      const result = this.ProductoService.getProducto()
      const res:any = await lastValueFrom(result)
      this.productos = res.map((item: any) => ({...item, cantidad: 0}))
      console.log('productos',res)
    }

    async showModal(producto: any){
        this.productSelected = producto
        this.visible = true
    }
    async modal(producto:any){
        this.productSelected = producto
        this.visto = true
    }

   async cambiarExistencia(){ 
    console.log('cantidad', this.cantidad)
    console.log('cantidad', this.productSelected)
    const request = {
      cantidad: this.cantidad,
      idProducto: this.productSelected.idProducto
    }
    console.log(request)
    const result = this.ProductoService.actInventario(request)
    const res =await lastValueFrom(result)
    console.log(res)
      this.showDialog()
      this.visible = false
      this.mostrarProducto()
    }

    async eliminarProducto(idProducto:number){
      console.log('idProducto',idProducto)
      if(idProducto){
        const result = this.ProductoService.borrarProducto(idProducto)
        const res: any = await lastValueFrom(result)
        console.log(res)
        this.eliminacion()
        this.mostrarProducto()
        }
      }

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
      
      async actualizarProduct(){
        console.log( "idProducto",this.productSelected)
        console.log( "idProducto",this.productSelected.idProducto)
        console.log( "idProvedor",this.idProvedorSelected.idProvedor)
        console.log( "idDepartamento",this.idDepartamentoSelected.idDepartamento)
        console.log( "descrpicion",this.productSelected.descripcion)
        console.log( "costo",this.productSelected.costo)
        console.log( "precio",this.productSelected.precio)
        console.log( "minimoexistencia",this.productSelected.minimoexistencia)
      
        const request = {
          idProducto: this.productSelected.idProducto,
          idProvedorProducto: this.idProvedorSelected.idProvedor,
          idDepartamentoProducto: this.idDepartamentoSelected.idDepartamento,
          descripcionProducto: this.productSelected.descripcion,
          costoProducto: this.productSelected.costo,
          precioProducto: this.productSelected.precio,
          minimoexistenciaProducto: this.productSelected.minimoexistencia
        }
        console.log(request)
         const result = this.ProductoService.crearProducto(request)
        const res = await lastValueFrom(result)
        console.log(res)
        this.visto = false
        this.dialog()
        this.mostrarProducto()
      }  


}
