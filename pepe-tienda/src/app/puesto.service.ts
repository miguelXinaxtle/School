import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  url: string ='http://localhost:3000/puestoList'
  constructor(private http:HttpClient) { }

  getPuesto(){
    return this.http.get('http://localhost:3000/puestoList')
  }

  crearUsuario(request: any){
    return this.http.post('http://localhost:3000/crearUsuario', request)
  }

  crearPuesto(request:any){
    return this.http.post('http://localhost:3000/crearPuesto',request)
  }

}
