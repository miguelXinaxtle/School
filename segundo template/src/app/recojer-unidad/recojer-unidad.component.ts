import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-recojer-unidad',
  templateUrl: './recojer-unidad.component.html',
  styleUrls: ['./recojer-unidad.component.css']
})
export class RecojerUnidadComponent implements OnInit, AfterViewInit {

  @ViewChild('search')
  searchElementRef!: ElementRef;
  
  latitude = 19.332363;
  longitude = -99.205399;
  zoom = 12;
  web_site = '';
  name = '';
  form: FormGroup;

  constructor(private sharedService:SharedService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,) {
        this.form = new FormGroup({
            instrucciones: new FormControl(''),
            de: new FormControl(''),
            a: new FormControl('')
        });
    }

  ngOnInit(): void {
    this.sharedService.setTituloHeader('¿Quieres que recojamos tu unidad?');
  }

  ngAfterViewInit(): void {
    this.findAdress();
  }

  findAdress = () => {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // some details
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place && place.geometry) {
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
          }
          this.zoom = 15;
        });
      });
    });
  }

  drag = ($event: any) => {
    console.log($event);
  }

}
