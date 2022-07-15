import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-cita-verificacion',
  templateUrl: './cita-verificacion.component.html',
  styleUrls: ['./cita-verificacion.component.css']
})
export class CitaVerificacionComponent implements OnInit {

  form: FormGroup;

  constructor(private sharedService: SharedService) {
    this.form = new FormGroup({
      fecha: new FormControl(''),
      de: new FormControl(''),
      a: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.sharedService.setTituloHeader('Cita de Verificación');
  }

}
