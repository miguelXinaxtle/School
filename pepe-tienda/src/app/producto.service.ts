import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url: string = 'http://localhost:3000/productoPorDepartamentoList/:idDepartamento'
  constructor(private http: HttpClient){ }

  productoPorDepartamentoList(query:number){
    return this.http.get(`http://localhost:3000/productoPorDepartamentoList/${query}`)
  }

  productoPorDescripcion(query: string){
  return this.http.get(`http://localhost:3000/productoPorDescripcion/${query}`) 
  }

  getProducto(){
    return this.http.get('http://localhost:3000/producto')
  }

  crearProducto(request: any){
    return this.http.post('http://localhost:3000/crearProducto', request) 
    }

    venderProduct(request: any){
      return this.http.post('http://localhost:3000/venderProduct', request) 
      }

    actInventario(request:any){
        return this.http.post('http://localhost:3000/updateInventario',request)
    }
   
    productoAbastecer(){
      return this.http.get('http://localhost:3000/productoAbastecer')
    }

    borrarProducto(query:number){
      return this.http.post(`http://localhost:3000/borrarProducto/${query}`, null)
    }
}

