import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = 'http://localhost:3000/usersList'
  constructor(private http: HttpClient) { }

  getUsuario(){
    return this.http.get('http://localhost:3000/usersList')
  }
  borrarUsuario(query:number){
    return this.http.post(`http://localhost:3000/borrarUsuario/${query}`, null)
  }
}
  