import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageCache$: Observable<any>;
  constructor( 
    private http: HttpClient
    ) { }

  public getMessages() {
    if (!this.messageCache$) {
      this.messageCache$ =  this.http.get(environment.verifyApiUrl + 'api/messages').pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!' );
      }), shareReplay(CACHE_SIZE)
    );
    }
    return this.messageCache$;
  }
}
