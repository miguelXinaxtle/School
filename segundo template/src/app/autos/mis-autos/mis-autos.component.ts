import { MapsAPILoader } from '@agm/core';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-mis-autos',
  templateUrl: './mis-autos.component.html',
  styleUrls: ['./mis-autos.component.css']
})
export class MisAutosComponent implements OnInit, AfterViewInit {

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
    this.sharedService.setTituloHeader('');
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

  customOptions: OwlOptions = {
    loop:true,
    autoplay:false,
    margin:20,
    nav:false,
    rtl:false,
    dots: false,
    navText: ['', ''],
    responsive:{
        0:{
            items:1
        },
        450:{
            items:1
        },
        600:{
            items:2
        },	
        991:{
            items:3
        }
    }
  }
}
