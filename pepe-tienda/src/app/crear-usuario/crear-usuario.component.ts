import { routes } from './../app.routes';
import { PuestoService } from './../puesto.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [CommonModule,ToastModule,FormsModule,InputNumberModule,CardModule,InputTextModule,CalendarModule,DropdownModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss',
  providers: [MessageService]
})
export class CrearUsuarioComponent {
  idPuestoSelected:any
  puestoList: any;
  nombre="";
  nacimiento="";
  correo="";
  telefono="";
  foto="";


  constructor(
     private puestoService: PuestoService,
    private messageService:MessageService
  ){}

    async ngOnInit (): Promise<void>{
      this.getPuestoList()
    }

    showDialog(){
      this.messageService.add({ severity:'success', summary: 'Registro Exitoso', detail:'Usuario Registrado'});
    }

    async getPuestoList(){
      const result = this.puestoService.getPuesto()
      const res = await lastValueFrom(result)
      this.puestoList = res
      console.log(res)
    }


  async  registrarUsuario(){
    console.log(this.idPuestoSelected.idPuesto)
    console.log(this.nombre)
    console.log(this.nacimiento)
    console.log(this.correo)
    console.log(this.telefono)
    console.log(this.foto)

    const request = {
        idPuestoUsuario: this.idPuestoSelected.idPuesto,
        nombreUsuario: this.nombre,
        nacimientoUsuario: this.nacimiento,
        correoUsuario: this.correo,
        telefonoUsuario: this.telefono,
        fotoUsuario: this.foto
    }
    console.log(request)
    const result = this.puestoService.crearUsuario(request)
    const res = await lastValueFrom(result)
    console.log(res)
    this.showDialog()
  }

}
