import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private cookie: CookieService,
    private userService: UserService,) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let headers = req.headers;
        const token = this.cookie.get('token');
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        
        const clonedRequest = req.clone({ headers });
        return next.handle(clonedRequest).pipe(tap(() => { }, err => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                console.log("Hellll");
                this.userService.free();
                window.location.href = environment.verifyApiUrl+"saml2/okta/login";
              }
          }
        }));
    
}
}
