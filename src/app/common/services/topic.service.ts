import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, publishReplay, refCount, shareReplay, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private topicsCache$: Observable<any>;
  constructor(
    private http: HttpClient) { }


  public getTopics() {

    if (!this.topicsCache$) {
      this.topicsCache$ = this.http.get(environment.verifyApiUrl + 'api/topics').pipe(
        map((data: any) => {
          return data;
        }), catchError( error => {
          return throwError( ()=>'Something went wrong!' );
        }), shareReplay(CACHE_SIZE)
      )
    }
    return this.topicsCache$;

    // return this.http.get(environment.verifyApiUrl + 'api/topics').pipe(
    //   map((data: any) => {
    //     return data;
    //   }),publishReplay(1),refCount(), catchError( error => {
    //     return throwError( ()=>'Something went wrong!' );
    //   })
    // );
  }

  public clearCache(){
    this.topicsCache$=null;
  }

  public getTopic(id) {
    return this.http.get(environment.verifyApiUrl + 'api/topics/'+id).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!' );
      })
    );
  }

  public updatePolicyDocument(id){
    return this.http.put(environment.verifyApiUrl + 'api/topics/'+id+'/updatepolicydocstatus',{}).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!' );
      })
    );

  }

}
