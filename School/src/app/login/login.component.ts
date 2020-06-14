import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../service/auth.service";
import { ILogin } from "../shared/login";
import { IResponse } from "../shared/response";
import { Settings } from "../constants/settings";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formLoginGroup: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (authService.isAutenticated) {
      router.navigate(["/home"]);
    }

    this.formLoginGroup = formBuilder.group({
      correo: [
        "",
        Validators.compose([
          Validators.maxLength(70),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      contrasenia: [
        "",
        Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {}

  sign() {
    let loginData: ILogin = {
      correo: this.formLoginGroup.get("correo").value,
      contrasenia: this.formLoginGroup.get("contrasenia").value,
    };

    this.authService.login(loginData).subscribe(
      (response: IResponse) => {
        console.log(response);
        if (response && response.item && response.item.idUsuario) {
          localStorage.setItem(
            Settings.KEY_USER,
            JSON.stringify(response.item)
          );
          console.log("vamonos para home");
          this.router.navigate(["/home"]);
        } else {
          this.snackBar.open(
            response && response.error && response.error.length
              ? response.error
              : "Ocurrio un erro en el servicio",
            "Mensaje",
            {
              duration: 3000,
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
