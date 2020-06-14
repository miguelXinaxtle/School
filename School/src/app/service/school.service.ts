import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IResponse } from "../shared/response";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { ISchool } from "../shared/school";

@Injectable({
  providedIn: "root",
})
export class SchoolService {
  private urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = environment.urlBaseService;
  }

  getSchoolList(): Observable<IResponse> {
    return this.http
      .get<IResponse>(`${this.urlBase}school/`)
      .pipe(catchError(this.errorHandler));
  }

  addSchool(school: ISchool): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.urlBase}school/addSchool`, school)
      .pipe(catchError(this.errorHandler));
  }

  modifySchool(school: ISchool): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.urlBase}school/modifySchool`, school)
      .pipe(catchError(this.errorHandler));
  }

  removeSchool(idSchool: number): Observable<IResponse> {
    return this.http
      .post<IResponse>(`${this.urlBase}school/removeSchool`, {
        idEscuela: idSchool,
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(error.message || "Error en el servicio.");
  }
}
