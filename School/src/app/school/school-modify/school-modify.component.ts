import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SchoolService } from "../../service/school.service";
import { ISchool } from "../../shared/school";
import { IResponse } from "../../shared/response";

@Component({
  selector: "app-school-modify",
  templateUrl: "./school-modify.component.html",
  styleUrls: ["./school-modify.component.css"],
})
export class SchoolModifyComponent implements OnInit {
  formRegisterGroup: FormGroup;
  school: ISchool;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private schoolService: SchoolService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const school = this.activatedRoute.snapshot.queryParamMap.get("school");
    if (school) {
      this.school = JSON.parse(school);
      console.log(this.school);
    }
    this.formRegisterGroup = formBuilder.group({
      nombre: [
        this.school.nombre,
        Validators.compose([
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      estado: [
        this.school.estado,
        Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      ciudad: [
        this.school.ciudad,
        Validators.compose([
          Validators.maxLength(70),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
      municipio: [
        this.school.municipio,
        Validators.compose([
          Validators.maxLength(100),
          Validators.minLength(3),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {}

  modifier() {
    let registerData: ISchool = {
      idEscuela: this.school.idEscuela,
      nombre: this.formRegisterGroup.get("nombre").value,
      estado: this.formRegisterGroup.get("estado").value,
      ciudad: this.formRegisterGroup.get("ciudad").value,
      municipio: this.formRegisterGroup.get("municipio").value,
    };

    this.schoolService
      .modifySchool(registerData)
      .subscribe((response: IResponse) => {
        console.log(response);
        if (response && response.item && response.item.modificado) {
          this.snackBar.open("Escuela modificada correctamente", "Mensaje", {
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
      });
  }
}
