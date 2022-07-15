import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../shared.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mis-tramites',
  templateUrl: './mis-tramites.component.html',
  styleUrls: ['./mis-tramites.component.css']
})
export class MisTramitesComponent implements OnInit {

  constructor(
    private sharedService:SharedService, 
    private _formBuilder: FormBuilder
  ) 
  { }


  ngOnInit(): void {
    this.sharedService.setTituloHeader('');
  }

}
