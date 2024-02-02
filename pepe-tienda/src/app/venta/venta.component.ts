import { VentaService } from './../venta.service';
import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { lastValueFrom, findIndex } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [FormsModule,CommonModule,TableModule,ButtonModule,CalendarModule],
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {
  ventas: any []=[]
  vendidos: any[]=[]
  dateInicial=""
  dateFinal=""
  fechaInicial=""
  fechaFinal=""
  valorPrecio=0
  valorSubtotal=0
  valorCosto=0


  constructor(private VentaService:VentaService){
  }


  async ngOnInit():Promise<void>{
  }

    async getVenta(){
      console.log(this.dateInicial)
      console.log(this.dateFinal)
      const result = this.VentaService.getVenta(formatDate(this.dateInicial, 'yyyy-MM-dd', 'en_US'),formatDate(this.dateFinal, 'yyyy-MM-dd', 'en_US'))
      const res:any = await lastValueFrom(result)
      this.ventas = res
      
      let costototal = 0
      for(let i=0; i< res.length; i ++){
        console.log('cuantas veces entro: ', i)
        const productoIterado = res[i]
        costototal = costototal + productoIterado.costo
      }
      this.valorCosto = costototal
      let precioTotal= 0
      for(let o=0; o< res.length; o++){
        console.log('cuantas veces : ', o)
        const resultado = res[o]
        precioTotal = precioTotal + resultado.precio
      }
      this.valorPrecio=precioTotal
      let subtotal = 0
      for(let s=0; s<res.length; s++){
      console.log('entro n veces',s)
      const sub = res[s]
      subtotal = subtotal + sub.subtotal
      this.valorSubtotal=subtotal
    }
      console.log('ventas',res)
      this.masVendidos()
    }


    async masVendidos(){
      console.log(this.fechaInicial,"fechas")
      console.log(this.fechaFinal,"fechas")
      const result = this.VentaService.masVendidos(formatDate(this.fechaInicial, 'yyyy-MM-dd', 'en_US'),formatDate(this.fechaFinal, 'yyyy-MM-dd', 'en_US'))
      const res:any = await lastValueFrom(result)
      this.vendidos = res
  }
      
}
