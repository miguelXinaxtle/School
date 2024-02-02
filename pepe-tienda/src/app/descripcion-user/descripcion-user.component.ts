import { UsuarioService } from './../usuario.service';
import { PuestoService } from './../puesto.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-descripcion-user',
  standalone: true,
  imports: [FormsModule,CommonModule,InputNumberModule,CardModule,InputTextModule,CalendarModule,DropdownModule,ButtonModule],
  templateUrl: './descripcion-user.component.html',
  styleUrl: './descripcion-user.component.scss'
})
export class DescripcionUserComponent {
  idUsuario: string | null;
  puestoList: any;
  idPuestoSelected: any
  nombre="";
  nacimiento="";
  correo="";
  telefono="";
  foto="";
  datos: any;

  constructor(
    private puestoService:PuestoService,
    private UsuarioService:UsuarioService,
    private route:ActivatedRoute
    )
  {
    this.idUsuario = this.route.snapshot.paramMap.get('idUsuario')
    console.log(this.idUsuario)
  }


  async ngOnInit(): Promise<void> {
  console.log("idUsuario",this.idUsuario)

    const result = this.UsuarioService.getUsuario();
    const res:any = await lastValueFrom(result)
    console.log('rees',res)
    const idx = res.findIndex((item:any)=> item.idUsuario == this.idUsuario)
    console.log('res',res[idx])
    this.datos = res[idx]
    console.log('datos', this.datos)

    this.getPuestoList()
  }


  async getPuestoList(){
    const result = this.puestoService.getPuesto()
    const res = await lastValueFrom(result)
    this.puestoList = res
    console.log(res)
  }

  chekeo(){
    console.log('cambios usuario:',this.datos)
    console.log('puesto:',this.idPuestoSelected.idPuesto)
  }


  async  upadateUsuario(idUsuario:number){
    console.log(idUsuario)
    console.log(this.idPuestoSelected.idPuesto)
    console.log(this.nombre)
    console.log(this.nacimiento)
    console.log(this.correo)
    console.log(this.telefono)
    console.log(this.foto)

    const request = {
        idUsuario: idUsuario,
        idPuestoUsuario: this.idPuestoSelected.idPuesto,
        nombreUsuario: this.datos.Nombre,
        nacimientoUsuario: this.datos.nacimiento,
        correoUsuario: this.datos.correo,
        telefonoUsuario: this.datos.telefono,
        fotoUsuario: this.datos.foto
    }
    console.log(request)
    const result = this.puestoService.crearUsuario(request)
    const res = await lastValueFrom(result)
    console.log(res)

  }

}

