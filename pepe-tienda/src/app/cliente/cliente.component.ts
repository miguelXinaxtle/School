import { routes } from './../app.routes';
import { ClienteService } from './../cliente.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule,ToastModule,CommonModule,DialogModule,ButtonModule,TableModule,CardModule,CalendarModule,InputTextModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
  providers: [MessageService]
})
export class ClienteComponent {
  nombreCliente=""
  nacimientoCliente=""
  correo=""
  telefono=""
  compras: any [] = []
  visible: boolean = false
  nombre: any;
  nacimiento: any;
  clienteSelected:any

  constructor(
    private ClienteService: ClienteService,
    private messageService:MessageService,
  ){}

  async ngOnInit (): Promise<void>{
    this.comprasCliente()
  }

  showDialog(){
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Cliente Registrado' });
  }

  dialog(){
    this.messageService.add({ severity: 'success', summary: '!Cambio Existoso¡', detail: 'Cliente Editado' });
  }

  elimincion(){
    this.messageService.add({ severity: 'success', summary: '!Aviso¡', detail: 'Cliente Eliminado' });
  }

  async modal(buy:any){
    this.clienteSelected = buy
    this.visible = true
}
  
  async crearCliente(){
    console.log(this.nombreCliente)
    console.log(this.nacimientoCliente)
    console.log(this.correo)
    console.log(this.telefono)

    const request = {
      nombre: this.nombreCliente,
      nacimiento: this.nacimientoCliente,
      correo: this.correo,
      telefono: this.telefono
    }
    console.log(request)
    const result =this.ClienteService.crearCliente(request)
    const res = await lastValueFrom(result)
    console.log(res)
    this.showDialog()
    this.comprasCliente()
  }

  async comprasCliente(){
      const result = this.ClienteService.comprasCliente()
      const res:any = await lastValueFrom(result)
      this.compras = res 
      console.log('compras',res)
    }

    async eliminarCliente(idCliente:number){
      console.log('idCliente',idCliente)
      if(idCliente){
        const result = this.ClienteService.borrarCliente(idCliente)
        const res: any = await lastValueFrom(result)
        console.log(res)
        this.elimincion()
        this.comprasCliente()
        }
      }
      // definicionCliente(idCliente: number){
      //   this.router.navigate([`cliente/${idCliente}`])
      // }

      async alterCliente(){ 
    console.log("Cliente",this.clienteSelected)
    console.log("idCliente",this.clienteSelected.idCliente)
    console.log("Nombre",this.clienteSelected.nombre)
    console.log("Nacimiento",this.clienteSelected.nacimiento),
    console.log("Correo",this.clienteSelected.correo)
    console.log("Telefono",this.clienteSelected.telefono)

    const request = {
      idCliente:this.clienteSelected.idCliente,
      nombre: this.clienteSelected.nombre,
      nacimiento: this.clienteSelected.nacimiento,
      correo: this.clienteSelected.correo,
      telefono: this.clienteSelected.telefono
    }
    console.log(request)
    const result =this.ClienteService.crearCliente(request)
    const res = await lastValueFrom(result)
    console.log(res)
    this.dialog()
    this.visible = false
    this.comprasCliente()
  }

  }



