import { DepartamentoService } from './../departamento.service';
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
  selector: 'app-crear-departamento',
  standalone: true,
  imports: [CommonModule,ToastModule,FormsModule,InputTextModule,CardModule,ButtonModule],
  templateUrl: './crear-departamento.component.html',
  styleUrl: './crear-departamento.component.scss',
  providers: [MessageService]
})
export class CrearDepartamentoComponent {
nombre="";

constructor(
  private departamentoService:DepartamentoService,
  private messageService:MessageService
  ){}

  showDialog(){
    this.messageService.add({ severity: 'success', summary: '!Registro Existoso¡', detail: 'Departamento Registrado' });
  }


async registrarDepartamento(){
    console.log(this.nombre)

    const request = {
      nombreDepartamento: this.nombre
    }
    console.log(request)
    const result = this.departamentoService.crearDepartamento(request)
    const res = await lastValueFrom(result)
    console.log(res)
    this.showDialog()
  }

}
