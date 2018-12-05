import { Injectable } from '@angular/core';

const GITHUB_TOKEN = 'githubtoken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem(GITHUB_TOKEN);
  }

  public setToken(token: string): void {
    localStorage.setItem(GITHUB_TOKEN, token);
  }
}
