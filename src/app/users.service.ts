import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersPage } from './model';

const BASE_URI = '/reqres/';
const USERS_ENDPOINT = '/api/users?page=2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public retrieveUsers(): Observable<UsersPage> {
    return this.httpClient.get<UsersPage>(`${BASE_URI}${USERS_ENDPOINT}`);
  }
}
