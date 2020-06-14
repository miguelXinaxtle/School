import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SchoolService } from "../service/school.service";
import { ISchool } from "../shared/school";
import { IResponse } from "../shared/response";

@Component({
  selector: "app-school",
  templateUrl: "./school.component.html",
  styleUrls: ["./school.component.css"],
})
export class SchoolComponent implements OnInit {
  public schoolList: Array<ISchool>;

  constructor(
    private schoolService: SchoolService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.schoolList = [];
  }

  ngOnInit(): void {
    this.getSchoolList();
  }

  getSchoolList() {
    this.schoolService.getSchoolList().subscribe(
      (response: IResponse) => {
        if (response && response.rows && response.rows.length) {
          this.schoolList = response.rows;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addSchool() {
    this.router.navigate(["/school-add"]);
  }

  modify(school: ISchool) {
    let extras: NavigationExtras = {
      queryParams: {
        school: JSON.stringify(school),
      },
    };
    this.router.navigate(["/school-modify"], extras);
  }

  delete(idSchool: number) {
    this.schoolService.removeSchool(idSchool).subscribe(
      (response: IResponse) => {
        if (response && response.item && response.item.eliminado) {
          this.getSchoolList();
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
