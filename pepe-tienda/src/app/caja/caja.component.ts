import { CommonModule } from '@angular/common';
import { CajaService } from './../caja.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-caja',
  standalone: true,
  imports: [FormsModule, CommonModule,ToastModule,TableModule,InputTextModule,CardModule,ButtonModule,InputNumberModule],
  templateUrl: './caja.component.html',
  styleUrl: './caja.component.scss',
  providers: [MessageService]
})
export class CajaComponent {
  montoInicial="";
  montoFinal="";
  idUsuario=3
  caja: any []=[]
  

  constructor(
    private CajaService: CajaService,
    private messageService:MessageService
    ){}

    async ngOnInit (): Promise<void>{
      this.mostrarCaja()
    }
  
    showDialog(){
      this.messageService.add({ severity: 'success', summary: 'Aviso', detail: 'Caja Abierta' });
    }

    dialog(){
      this.messageService.add({ severity: 'error', summary: 'Aviso', detail: 'Caja Cerrada' });
    }

    async mostrarCaja(){
      const result = this.CajaService.verCaja()
      const res:any = await lastValueFrom(result)

      this.caja = res //[0].montoActual
      console.log('caja',res)//[0].montoActual)
    }


   async registerCaja(estatus:boolean){
    let request

    if(estatus){
       request = {
        monto:this.montoInicial,
        estatus:1,
        idUsuario: this.idUsuario,
      }
    this.showDialog()
    }
    else{
      request = {
           monto: this.montoFinal,
           estatus:0,
           idUsuario: this.idUsuario,
         }
        this.dialog()
        }
    console.log(request)
      const result = this.CajaService.abrirCaja(request)
     const res = await lastValueFrom(result)
     console.log(res)
     this.mostrarCaja()
  }
  
}
   //async closeCaja(){
   // console.log(this.cerrar)
   // console.log(this.montoFinal)
   // console.log(this.idUsuario)
   // 
   // const request = {
   //   monto: this.montoFinal,
   //   estatus:this.cerrar,
   //   idUsuario: this.idUsuario,
   // }
   // console.log(request)
   //  const result = this.CajaService.abrirCaja(request)
   // const res = await lastValueFrom(result)
   // console.log(res)