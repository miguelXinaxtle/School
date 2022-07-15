import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;
  tituloHeader$: Subject<string>;

  constructor() {
    this.tituloHeader$ = new Subject();
  }
  
  toggleSidebarClass() {
	return this.navSidebarClass = !this.navSidebarClass  ;
  }
  toggleHamburgerClass() {
	return this.hamburgerClass = !this.hamburgerClass  ;
  }
 
  getTituloHeader$ = () => this.tituloHeader$;
 
  setTituloHeader = (titulo: string) => this.tituloHeader$.next(titulo); 
}
