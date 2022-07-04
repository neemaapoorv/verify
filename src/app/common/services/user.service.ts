import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { catchError, map, shareReplay } from 'rxjs/operators';
import {  Observable, throwError } from 'rxjs';
import { UserCharter } from '../models/user-charter';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userCache$: Observable<any>;
  updateCharter(data: UserCharter) {
    if(UserService.user){
      UserService.user.charter=data;
    }
  }

  static user: User;
  public subject: BehaviorSubject<null | User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    ) {}

  public free() {
    this.cookie.delete('token', '/', window.location.hostname);
    UserService.user = null;
    this.subject.next(UserService.user);
  }

  public getLoggedInUser(){
    return UserService.user;
  }
  public getCurrent() {
    if (!this.userCache$) {
    this.userCache$= this.http.get(environment.verifyApiUrl + 'api/user/me').pipe(
      map((data: any) => {
        UserService.user=data;
        this.subject.next(UserService.user);
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!' );
      }), shareReplay(CACHE_SIZE)
    );
    }
    return this.userCache$;
  }

  public clearCache(){
    this.userCache$=null;
  }

  // public getCurrent() {
  //   return this.http.get(environment.verifyApiUrl + 'api/user/me').pipe(
  //     map((data: any) => {
  //       UserService.user=data;
  //       this.subject.next(UserService.user);
  //       return data;
  //     }), catchError( error => {
  //       return throwError( ()=>'Something went wrong!' );
  //     })
  //   );
  // }

  refreshInternally(user: User) {
    UserService.user = new User(user);
    this.subject.next(UserService.user);
    return user;
  }

  public isLoggedIn() {
    return this.cookie.get('token') ? true : false;
  }

  
 errorHandler(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}
}
