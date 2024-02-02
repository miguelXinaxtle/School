import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
url: string = 'http://localhost:3000/getVenta'
  constructor(private http:HttpClient) { }


  getVenta(dateInicial: any, dateFinal:any){
    return this.http.get(`http://localhost:3000/getVenta/${dateInicial}/${dateFinal}`)
  }

masVendidos(fechaInicial: any, fechaFinal:any){
  return this.http.get(`http://localhost:3000/masVendidos/${fechaInicial}/${fechaFinal}`)
}

}