import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  url: string = 'http://localhost:3000/departamentoList'
  constructor(private http: HttpClient) { }

  getDepartamento(){
    return this.http.get('http://localhost:3000/departamentoList')
  }

  crearDepartamento(request:any){
    return this.http.post('http://localhost:3000/crearDepartamento',request)
  }
}
