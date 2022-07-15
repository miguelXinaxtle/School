import { SharedService } from './../../shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	
	toggleChat: boolean = true;
	toggleSingle: boolean = true;
	nuevaCita: string = "";
	tituloHeader = '';

	@ViewChild('menuTrigger1') menuTrigger!: MatMenuTrigger;
	
	constructor(private sharedService: SharedService,) { }
	
	ngOnInit(): void {
		this.nuevaCita="Nueva cita";
		this.sharedService.getTituloHeader$().subscribe((titulo: string) => {
			this.tituloHeader = titulo;
		});
		
	}
	
	
	togglechatbar() {
		this.toggleChat = !this.toggleChat;
	}
	singleChatWindow() {
		this.toggleSingle = !this.toggleSingle;
	}

}
