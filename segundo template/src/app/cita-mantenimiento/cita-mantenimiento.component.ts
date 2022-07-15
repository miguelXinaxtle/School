import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-formulario-citas',
  templateUrl: './cita-mantenimiento.component.html',
  styleUrls: ['./cita-mantenimiento.component.css']
})
export class CitaMantenimientoComponent implements OnInit {

  form: FormGroup;
  public talleres = [{
    id: 1,
    nombre: 'Ford Grupo Andrade La Vigas'
  }];

  public servicios = [{
    id: 1,
    nombre: 'Servicio 1'
  }];

  constructor(private sharedService: SharedService) {
    this.form = new FormGroup({
      placaVIN: new FormControl(''),
      telefono: new FormControl(''),
      estado: new FormControl(''),
      ciudad: new FormControl(''),
      alcaldia: new FormControl(''),
      codigoPostal: new FormControl(''),
      servicio: new FormControl(''),
      taller: new FormControl(''),
      descripcion: new FormControl(''),
      fecha: new FormControl(''),
      de: new FormControl(''),
      a: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.sharedService.setTituloHeader('Cita de Mantenimiento');
    
  }


}
