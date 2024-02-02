import { lastValueFrom } from 'rxjs';
import { ProductoService } from './../producto.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartamentoService } from '../departamento.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-producto-departamento',
  standalone: true,
  imports: [FormsModule,CommonModule,TableModule,ButtonModule,DropdownModule],
  templateUrl: './producto-departamento.component.html',
  styleUrl: './producto-departamento.component.scss'
})
export class ProductoDepartamentoComponent {
 
  departamentoList: any;
idDepartamentoSelected: any
  listProduct: any[] = [];


  constructor(private ProductoService:ProductoService,private departamentoService:DepartamentoService){}

  async ngOnInit(): Promise<void> {
    this.getDepartamentoList()
  }

  async getDepartamentoList(){
    const result = this.departamentoService.getDepartamento()
    const res = await lastValueFrom(result)
    this.departamentoList = res
    console.log(res)
  }
  
  async productoPorDepartamento() {
    console.log(this.idDepartamentoSelected.idDepartamento)
  console.log('idDepartamento',this.idDepartamentoSelected)
  if(this.idDepartamentoSelected){
  const result = this.ProductoService.productoPorDepartamentoList(this.idDepartamentoSelected.idDepartamento)
  const res: any = await lastValueFrom(result)
  this.listProduct = res
  console.log(res)
  }
  
 }
}
