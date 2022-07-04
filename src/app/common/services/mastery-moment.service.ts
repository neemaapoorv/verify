import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasteryMomentService {

  constructor(
    private http: HttpClient
    ) { }

  public createMasteryMoment(topic_id:string) {
    return this.http.get(environment.verifyApiUrl + 'api/masterymoment/create/'+ topic_id).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!');
      })
    );
  }

  public completeMasteryMoment(mastery_id:string) {
    return this.http.put(environment.verifyApiUrl + 'api/masterymoment/complete/'+ mastery_id,{}).pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!');
      })
    );
  }

  public updateMasteryMoment(mastery_id,activityId,confidence,duration,answerId) {
    return this.http.post(environment.verifyApiUrl + 'api/masterymoment/update/'+ mastery_id,{
      "activityId": activityId,
      "confidence": confidence,
      "duration": duration,
      "answerId": answerId
    }).pipe(
        map((data: any) => {
          return data;
        }), catchError( error => {
          return throwError( ()=>'Something went wrong!');
        })
      );
  }
  
  
}
