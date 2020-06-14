import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ISchool } from "../../shared/school";
import { IResponse } from "../../shared/response";
import { SchoolService } from "../../service/school.service";

@Component({
  selector: "app-school-add",
  templateUrl: "./school-add.component.html",
  styleUrls: ["./school-add.component.css"],
})
export class SchoolAddComponent implements OnInit {
  formRegisterGroup: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private schoolService: SchoolService,
    private router: Router
  ) {
    this.formRegisterGroup = formBuilder.group({
      nombre: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      estado: [
        "",
        Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      ciudad: [
        "",
        Validators.compose([
          Validators.maxLength(70),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      municipio: [
        "",
        Validators.compose([
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {}

  register() {
    let registerData: ISchool = {
      idEscuela: null,
      nombre: this.formRegisterGroup.get("nombre").value,
      estado: this.formRegisterGroup.get("estado").value,
      ciudad: this.formRegisterGroup.get("ciudad").value,
      municipio: this.formRegisterGroup.get("municipio").value,
    };

    this.schoolService.addSchool(registerData).subscribe(
      (response: IResponse) => {
        if (response && response.item && response.item.idEscuela) {
          this.snackBar.open("Escuela registrada correctamente", "Mensaje", {
            duration: 3000,
          });
          this.router.navigate(["/home"]);
        } else {
          this.snackBar.open(
            response && response.error && response.error.length
              ? response.error
              : "Ocurrio un error en el servicio",
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
