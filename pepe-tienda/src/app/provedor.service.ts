import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvedorService {
  url:string = 'http://localhost:3000/provedorList'
  constructor(private http:HttpClient) { }

  getProvedor(){
    return this.http.get('http://localhost:3000/provedorList')
  }


  crearProvedor(request:any){
    return this.http.post('http://localhost:3000/crearProvedor',request)
  }
}
