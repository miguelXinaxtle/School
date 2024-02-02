import { ProductoService } from './../producto.service';
import { UsuarioService } from './../usuario.service';
import { DepartamentoService } from './../departamento.service';
import { ProvedorService } from './../provedor.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule,ToastModule,FormsModule,ButtonModule,InputTextModule,DropdownModule,InputNumberModule,CardModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss',
  providers: [MessageService]
})
export class CrearProductoComponent implements OnInit {
  provedorList: any;
  idProvedorSelected:any
  
  departamentoList: any;
  idDepartamentoSelected: any
  
  idUsuario=3 ;
  userList:any;
  descripcion="";
  costo="";
  minimoexistencia="";
  precio="";



  constructor(
    private provedorService: ProvedorService, 
    private departamentoService: DepartamentoService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private messageService: MessageService,
    ){}

  async ngOnInit(): Promise<void> {
    this.getProvedorList()
    this.getDepartamentoList()
    this.getUsuario()
  }

  showDialog() {
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Producto Registrado' });
  }

  async getProvedorList(){
    const result = this.provedorService.getProvedor()
    const res = await lastValueFrom(result)
    this.provedorList = res
    console.log(res)
  }
  async getDepartamentoList(){
    const result = this.departamentoService.getDepartamento()
    const res = await lastValueFrom(result)
    this.departamentoList = res
    console.log(res)
  }
  async getUsuario(){
  const result = this.usuarioService.getUsuario()
    const res = await lastValueFrom(result)
    this.userList = res
    console.log(res)
  }

   async crearProducto(){
  //     const result = this.productoService.crearProducto()
  //   const res = await lastValueFrom(result)
  //   console.log(res)
 }

 async registerProduct(){
  console.log(this.idProvedorSelected.idProvedor)
  console.log(this.idDepartamentoSelected.idDepartamento)
  console.log(this.descripcion)
  console.log(this.costo)
  console.log(this.precio)
  console.log(this.minimoexistencia)
  console.log(this.idUsuario)  

  const request = {
    idProvedorProducto: this.idProvedorSelected.idProvedor,
    idDepartamentoProducto: this.idDepartamentoSelected.idDepartamento,
    idUsuarioProducto: this.idUsuario,
    descripcionProducto: this.descripcion,
    costoProducto: this.costo,
    precioProducto: this.precio,
    minimoexistenciaProducto: this.minimoexistencia
  }
  console.log(request)
   const result = this.productoService.crearProducto(request)
  const res = await lastValueFrom(result)
  console.log(res)
  this.showDialog()
 }  
  

}
