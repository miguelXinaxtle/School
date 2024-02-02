import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PuestoService } from '../puesto.service';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,ToastModule,InputTextModule,FormsModule,ButtonModule,DialogModule,DropdownModule, CalendarModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [MessageService]
})
export class UserComponent implements OnInit {
userList: any
idUsuarioselected: any
visible: boolean = false
usuarioSelected: any
puestoList: any;
idPuestoSelected: any;
datos: any;
puesto: any

  constructor(
    private userService: UsuarioService,
    private router:Router, 
    private puestoService: PuestoService,
    private messageService:MessageService
    ){}

  async ngOnInit(): Promise<void> {
    this.mostrarUsuario()
   this.getPuestoList()
  }
  
  showDialog(){
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Usuario Editado'});
  }

  dialog(){
    this.messageService.add({ severity: 'success', summary: '!Aviso', detail: 'Usuario Eliminado'});
  }

  async modal(item:any){
    this.usuarioSelected = item
    this.visible = true
    console.log(this.puestoList)
    console.log(this.usuarioSelected)
    var resultado:any = this.puestoList.find((obj:any) => obj.idPuesto === this.usuarioSelected.idPuesto)
    console.log('resultado:',resultado)
    this.puesto = resultado
}


  async mostrarUsuario(){
  console.log('hola')
  const result = this.userService.getUsuario()
  const res:any = await lastValueFrom(result)
  this.userList = res
  console.log(res)
  }


  async eliminarUsuario(idUsuario:number){
  console.log('idUsuario',idUsuario)
  if(idUsuario){
    const result = this.userService.borrarUsuario(idUsuario)
    const res: any = await lastValueFrom(result)
    console.log(res)
    this.dialog()
    this.mostrarUsuario()
    }
  }
  async editarUsuario(idUsuario:number){
    this.router.navigate([`user/${idUsuario}`])
  }

  async getPuestoList(){
    const result = this.puestoService.getPuesto()
    const res = await lastValueFrom(result)
    this.puestoList = res
    
    // var result = jsObjects.find(obj => obj.b === 1)
  }


  async  upadateUsuario(){
    console.log('usuario:',this.usuarioSelected)
    console.log("idUsuario:",this.usuarioSelected.idUsuario)
    console.log("idPuesto:",this.usuarioSelected.idPuesto)
    console.log("nombre:",this.usuarioSelected.Nombre)
    console.log("nacimiento:",this.usuarioSelected.nacimiento)
    console.log("correo:",this.usuarioSelected.correo)
    console.log("telefono:",this.usuarioSelected.telefono)
    console.log("foto:",this.usuarioSelected.foto)
    

    const request = {
        idUsuario:this.usuarioSelected.idUsuario,
        idPuestoUsuario: this.usuarioSelected.idPuesto,
        nombreUsuario: this.usuarioSelected.Nombre,
        nacimientoUsuario: this.usuarioSelected.nacimiento,
        correoUsuario: this.usuarioSelected.correo,
        telefonoUsuario: this.usuarioSelected.telefono,
        fotoUsuario: this.usuarioSelected.foto
    }
    console.log(request)
    const result = this.puestoService.crearUsuario(request)
    const res = await lastValueFrom(result)
    console.log(res)
    this.showDialog()
    this.visible = false
    this.mostrarUsuario()
  }


}
