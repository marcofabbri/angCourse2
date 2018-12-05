import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commit } from './model';
import { map } from 'rxjs/operators';

const BASE_URI = '/github/';
const REPO_NAME = 'angular/angular';
const COMMITS_ENDPOINT = '/commits';
const LINK_HEADER = 'Link';

@Injectable({
  providedIn: 'root'
})
export class CommitsService {

  constructor(private httpClient: HttpClient) { }

  public retrieveCommits(): Observable<Commit[]> {
    return this.httpClient.get<Commit[]>(
      `${BASE_URI}${REPO_NAME}${COMMITS_ENDPOINT}`, { observe: 'response' }
    ).pipe(map(
      resp => {
        const linkHeader = resp.headers.get(LINK_HEADER);
        console.log(linkHeader);
        return resp.body;
      }
    ));
  }
}
