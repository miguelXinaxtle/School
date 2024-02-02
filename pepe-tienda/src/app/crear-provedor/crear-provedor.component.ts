import { ProvedorService } from './../provedor.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-provedor',
  standalone: true,
  imports: [CommonModule,ToastModule,TableModule,ButtonModule,FormsModule,InputTextModule,InputNumberModule,DropdownModule,CardModule],
  templateUrl: './crear-provedor.component.html',
  styleUrl: './crear-provedor.component.scss',
  providers : [MessageService]
})
export class CrearProvedorComponent {
nombre="";
correo="";
telefono="";
empresa="";
provedorlist: any;

constructor(
  private provedorService: ProvedorService,
  private messageService:MessageService
  ){}

async crearProvedor(){

}
async ngOnInit(): Promise<void> {
  this.getProvedor()
}

  showDialog(){
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Proveedor Registrado' });
  }

  async getProvedor(){
    const result = this.provedorService.getProvedor()
    const res = await lastValueFrom(result)
    this.provedorlist = res
    console.log(res)
  }

async registrarProvedor(){
    console.log(this.nombre)
    console.log(this.correo)
    console.log(this.telefono)
    console.log(this.empresa)

    const request = {
      nombreProvedor: this.nombre,
      correoProvedor: this.correo,
      telefonoProvedor: this.telefono,
      empresaProvedor: this.empresa,
    }
    console.log(request)
    const result = this.provedorService.crearProvedor(request)
    const res = await lastValueFrom(result)
    console.log(res)
    this.showDialog()
  }
  }



