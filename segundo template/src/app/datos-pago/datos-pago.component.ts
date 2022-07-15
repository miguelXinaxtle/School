import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.component.html',
  styleUrls: ['./datos-pago.component.css']
})
export class DatosPagoComponent implements OnInit {

  form: FormGroup;

  constructor(private sharedService: SharedService) { 
    this.form = new FormGroup({
      totalPagar: new FormControl('1473'),
      numTarjeta: new FormControl('', [Validators.required]),
      venceMes: new FormControl('01'),
      venceAnio: new FormControl('2022'),
      numSeguridad: new FormControl('', [Validators.required]),
      tipoTarjeta: new FormControl('1'),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      rfc: new FormControl('', [Validators.required]),
      telFijo: new FormControl(''),
      cel: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      pais: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.sharedService.setTituloHeader('Datos del Pago');
  }

}
