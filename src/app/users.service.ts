import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsersPage } from './model';
import { catchError } from 'rxjs/operators';

const BASE_URI = '/reqres/';
const USERS_ENDPOINT = '/api/users?page=2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public retrieveUsers(): Observable<UsersPage> {
    return this.httpClient.get<UsersPage>(`${BASE_URI}${USERS_ENDPOINT}`).pipe(
      catchError(error => this.generateErrorObservable(error, 'retrieveUsers'))
    );
  }

  public updateUser(): Observable<UsersPage> {
    return this.httpClient.patch<UsersPage>(`${BASE_URI}${USERS_ENDPOINT}`, {}).pipe(
      catchError(error => this.generateErrorObservable(error, 'updateUser'))
    );
  }

  private generateErrorObservable(error: HttpErrorResponse, fnName: string) {
    console.error(`${fnName} generated an error`);
    if (error.error instanceof ErrorEvent) {
      console.error('Client error');
    } else {
      console.error(`Backend error`);
      switch (error.status) {
        case 401:
          this.handleUnauthorized();
          break;
        case 403:
          this.handleForbidden();
          break;
        case 500:
          this.hanldeInternalServerError();
          break;
        default:
          break;
      }
    }
    return throwError('error');
  }

  private handleUnauthorized() {

  }

  private handleForbidden() {

  }

  private hanldeInternalServerError() {

  }
}
