import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  public getTasks() {
    return this.http.get(environment.verifyApiUrl + 'api/tasks').pipe(
      map((data: any) => {
        return data;
      }), catchError( error => {
        return throwError( ()=>'Something went wrong!' );
      })
    );
  }

  private nextTasks = new BehaviorSubject("")
  currentData = this.nextTasks.asObservable();

    setData(data:any){
      this.nextTasks.next(data);
    }

    getData():any{
        return this.nextTasks;
    }
}
