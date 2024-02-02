import { PuestoService } from './../puesto.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-crear-puesto',
  standalone: true,
  imports: [CommonModule,ToastModule,FormsModule,InputTextModule,CardModule,ButtonModule],
  templateUrl: './crear-puesto.component.html',
  styleUrl: './crear-puesto.component.scss',
  providers: [MessageService]
})
export class CrearPuestoComponent {
nombre="";


constructor(
  private puestoService:PuestoService,
  private messageService:MessageService
  ){}

  showDialog(){
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Puesto Registrado' });
  }

async registrarPuesto(){
  console.log(this.nombre)

  const request = {
    nombrePuesto: this.nombre
  }
  console.log(request)
  const result = this.puestoService.crearPuesto(request)
  const res =await lastValueFrom(result)
  console.log(res)
  this.showDialog()
}






}
