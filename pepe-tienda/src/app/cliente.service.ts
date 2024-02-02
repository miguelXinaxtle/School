import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url:string = `http://localhost:3000/crearCliente`
  constructor(private http:HttpClient) { }

  crearCliente(request: any){
    return this.http.post(`http://localhost:3000/crearCliente`,request)
  }
  comprasCliente(){
    return this.http.get(`http://localhost:3000/comprasCliente`)
  }
  borrarCliente(query:number){
    return this.http.post(`http://localhost:3000/borrarCliente/${query}`, null)
  }
}
