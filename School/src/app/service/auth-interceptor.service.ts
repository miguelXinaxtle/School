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
    const userJson: string = localStorage.getItem(Settings.KEY_USER);

    let request = req;

    if (userJson) {
      const user: IUser = JSON.parse(userJson);
      request = req.clone({
        setHeaders: {
          authorization: user.token,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          localStorage.clear();
          this.router.navigateByUrl("/splash");
        }
        return throwError(err);
      })
    );
  }
}
