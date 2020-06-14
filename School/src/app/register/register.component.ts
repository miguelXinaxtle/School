import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../service/auth.service";
import { IRegister } from "../shared/register";
import { IResponse } from "../shared/response";
import { Settings } from "../constants/settings";
import { ILogin } from "../shared/login";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  formRegisterGroup: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (authService.isAutenticated) {
      console.log("Ya estas logueado");
      router.navigate(["/home"]);
    }

    this.formRegisterGroup = formBuilder.group({
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
      nombre: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      telefono: [
        "",
        Validators.compose([
          Validators.maxLength(20),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {}

  register() {
    let registerData: IRegister = {
      correo: this.formRegisterGroup.get("correo").value,
      contrasenia: this.formRegisterGroup.get("contrasenia").value,
      nombre: this.formRegisterGroup.get("nombre").value,
      telefono: this.formRegisterGroup.get("telefono").value,
    };

    this.authService.addUser(registerData).subscribe(
      (response: IResponse) => {
        console.log(response);
        if (response && response.item && response.item.idUsuario) {
          this.sign();
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

  sign() {
    let loginData: ILogin = {
      correo: this.formRegisterGroup.get("correo").value,
      contrasenia: this.formRegisterGroup.get("contrasenia").value,
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
