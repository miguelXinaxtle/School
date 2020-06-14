import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { Settings } from "../constants/settings";
import { IUser } from "../shared/user";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtiene el usuario de localStorage para obtener el token en caso de que exista
    const userJson: string = localStorage.getItem(Settings.KEY_USER);

    let request = req;

    if (userJson) {
      // Deserealiza el objeto para obtener el token
      const user: IUser = JSON.parse(userJson);
      // Agrega el token al cabecero de las peticiones
      request = req.clone({
        setHeaders: {
          authorization: user.token,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // El token es caduco, por lo tanto es redirigido de la aplicación
          localStorage.clear();
          this.router.navigateByUrl("/splash");
        }
        return throwError(err);
      })
    );
  }
}
