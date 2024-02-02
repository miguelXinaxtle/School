import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router:Router){}

  inicio(){
    this.router.navigate([""])
  }

  irUsuario(){
    this.router.navigate(["user"])
  }

  CrearProducto(){
    this.router.navigate(["crearProducto"])
  }

  CrearUsuario(){
    this.router.navigate(["crearUsuario"])
  }
  CrearProvedor(){
    this.router.navigate(["crearProvedor"])
  }
  CrearDepartamento(){
    this.router.navigate(["crearDepartamento"])
  }
  CrearPuesto(){
    this.router.navigate(["crearPuesto"])
  }
  CrearCaja(){
    this.router.navigate(["caja"])
  }
  inventario(){
    this.router.navigate(['inventario'])
  }
  venta(){
    this.router.navigate(['venta'])
  }
  minimoExistencia(){
    this.router.navigate(['minimoExistencia'])
  }
  cliente(){
    this.router.navigate(['cliente'])
  }
  departamentos(){
    this.router.navigate(['productoDepartamento'])
  }

}
