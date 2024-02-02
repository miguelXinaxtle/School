import { Component } from '@angular/core';
import { ProductoService } from './../producto.service';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-minimo-existencia',
  standalone: true,
  imports: [CommonModule,FormsModule,TableModule],
  templateUrl: './minimo-existencia.component.html',
  styleUrl: './minimo-existencia.component.scss'
})
export class MinimoExistenciaComponent {
    productos: any []=[]

    constructor(private ProductoService:ProductoService){}

    async ngOnInit(): Promise<void> {
    
      const result = this.ProductoService.productoAbastecer()
      const res:any = await lastValueFrom(result)
      this.productos = res
      console.log('productos',res)
    
  }

}
