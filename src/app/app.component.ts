import { Component } from '@angular/core';
import { CommitsService } from './commits.service';
import { TokenService } from './token.service';
import { Commit, User } from './model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public commits: Commit[];
  public users: User[];
  public token: string;

  constructor(private commitsService: CommitsService,
    private tokenService: TokenService,
    private usersService: UsersService) {
  }

  public retrieveCommits(): void {
    this.commitsService.retrieveCommits().subscribe(
      commits => this.commits = commits);
  }

  public retrieveUsers(): void {
    this.usersService.retrieveUsers().subscribe(
      userPage => this.users = userPage.data
    );
  }

  public saveToken(): void {
    this.tokenService.setToken(this.token);
  }

  public getToken(): string {
    return this.tokenService.getToken();
  }

  public hasToken(): boolean {
    return !!this.tokenService.getToken();
  }
}
