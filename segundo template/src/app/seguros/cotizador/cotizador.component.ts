import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../shared.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private sharedService:SharedService, 
    private _formBuilder: FormBuilder
  ) 
  { }

  ngOnInit(): void {
    this.sharedService.setTituloHeader('Seguros');
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  images = [
    'assets/images/big/img1.jpg',
    'assets/images/big/img2.jpg',
    'assets/images/big/img3.jpg',
  ];

  model!: NgbDateStruct;
  model2!: NgbDateStruct;
}
