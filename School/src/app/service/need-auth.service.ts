import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class NeedAuthService {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Determina si esta authenticado el usuario
    if (!this.authService.isAutenticated) {
      this.router.navigate(["splash"]);
      return false;
    }
    return true;
  }
}
