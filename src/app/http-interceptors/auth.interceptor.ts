import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    const token = this.authService.getToken()
    let request: HttpRequest<any> = req;
    const url = request.url;

    if (token && !url.endsWith('/auth/login') && !url.endsWith('/usuario/salvar')) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      if (error.status === 403 ) {
        this.router.navigate(['login']);
      }
    }
    return throwError('Ocorreu um erro, tente novamente');
  }
}
