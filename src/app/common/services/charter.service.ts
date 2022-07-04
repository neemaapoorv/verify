import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class CharterService {
  private charterCache$: Observable<any>;
  constructor(
    private http: HttpClient
  ) { }

  public getCharter() {
    if (!this.charterCache$) {
      this.charterCache$ =this.http.get(environment.verifyApiUrl + 'api/charter').pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!' );
      }), shareReplay(CACHE_SIZE)
    );
    }
    return this.charterCache$;
  }

  public markCharterComplete(charter_id) {
    return this.http.post(environment.verifyApiUrl + 'api/charter/markcomplete/'+charter_id,{}).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!' );
      })
    );
  }
}
