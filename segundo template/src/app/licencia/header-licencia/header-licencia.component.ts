import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-licencia',
  templateUrl: './header-licencia.component.html',
  styleUrls: ['./header-licencia.component.scss']
})
export class HeaderLicenciaComponent implements OnInit {

  toggleChat: boolean = true;
	toggleSingle: boolean = true;
	nuevaCita: string = "";
	
	constructor() { }
	
	ngOnInit(): void {
		this.nuevaCita="Nueva cita";
	}
	
	
	togglechatbar() {
		this.toggleChat = !this.toggleChat;
	}
	singleChatWindow() {
		this.toggleSingle = !this.toggleSingle;
	}
}
