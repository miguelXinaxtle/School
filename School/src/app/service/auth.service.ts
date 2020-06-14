import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";
import { ILogin } from "../shared/login";
import { IUser } from "../shared/user";
import { Settings } from "../constants/settings";
import { IRegister } from "../shared/register";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: IUser;
  urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = environment.urlBaseService;
  }

  get token() {
    const user = JSON.parse(localStorage.getItem(Settings.KEY_USER));
    return user;
  }

  get isAutenticated() {
    // Recargamos el usuario cuando solicitan saber si esta autenticado
    this.user = JSON.parse(localStorage.getItem(Settings.KEY_USER));
    return !!localStorage.getItem(Settings.KEY_USER);
  }

  logout() {
    // Elimina el ususario del localStorage
    localStorage.removeItem(Settings.KEY_USER);
  }

  login(login: ILogin) {
    // Invocar el servicio
    return this.http
      .post(`${this.urlBase}security/login`, login)
      .pipe(catchError(this.errorHandler));
  }

  addUser(register: IRegister) {
    // Invocar el servicio
    return this.http
      .post(`${this.urlBase}security/addUser`, register)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(error.message || "Error en el servicio.");
  }
}
