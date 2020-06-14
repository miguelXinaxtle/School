import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: "app-splash-screen",
  templateUrl: "./splash-screen.component.html",
  styleUrls: ["./splash-screen.component.css"],
})
export class SplashScreenComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    if (authService.isAutenticated) {
      router.navigate(["/home"]);
    }
  }

  ngOnInit(): void {}
}
