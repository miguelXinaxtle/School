import { ClienteService } from './../cliente.service';
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
  selector: 'app-descripcion-cliente',
  standalone: true,
  imports: [FormsModule,CommonModule,InputNumberModule,InputTextModule,CalendarModule,DropdownModule,ButtonModule,CardModule],
  templateUrl: './descripcion-cliente.component.html',
  styleUrl: './descripcion-cliente.component.scss'
})
export class DescripcionClienteComponent {
  idCliente: string | null;
  nombre="";
  nacimiento="";
  correo="";
  telefono="";
  compras: any;



  constructor(
    private route:ActivatedRoute,
    private ClienteService:ClienteService
  ){
    this.idCliente = this.route.snapshot.paramMap.get('idCliente')
  console.log(this.idCliente)
  }


  async ngOnInit(): Promise<void> {
    console.log("idCliente",this.idCliente)
  
      const result = this.ClienteService.comprasCliente();
      const res:any = await lastValueFrom(result)
      console.log('reees',res)
      const idx = res.findIndex((item:any)=> item.idCliente == this.idCliente)
      console.log('res',res[idx])
      this.compras = res[idx]
      console.log('compras', this.compras)
  }

  async ver(){
    console.log('cliente cambio',this.compras)
  }



  async alterCliente(idCliente: number){
    console.log(idCliente)
    console.log(this.nombre)
    console.log(this.nacimiento)
    console.log(this.correo)
    console.log(this.telefono)

    const request = {
      idCliente:idCliente,
      nombre: this.compras.nombre,
      nacimiento: this.compras.nacimiento,
      correo: this.compras.correo,
      telefono: this.compras.telefono
    }
    console.log(request)
    const result =this.ClienteService.crearCliente(request)
    const res = await lastValueFrom(result)
    console.log(res)
  }


}
