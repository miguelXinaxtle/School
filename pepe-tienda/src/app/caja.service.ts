import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  url: string = 'http://localhost:3000/abrirCaja'
  constructor(private http: HttpClient) { }


  abrirCaja(request: any){
    return this.http.post('http://localhost:3000/abrirCaja', request) 
    }

    verCaja(){
      return this.http.get('http://localhost:3000/verCaja')
    }
}







  
