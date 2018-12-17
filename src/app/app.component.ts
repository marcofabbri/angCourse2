import { Component } from '@angular/core';
import { CommitsService } from './commits.service';
import { TokenService } from './token.service';
import { Commit, User } from './model';
import { UsersService } from './users.service';
import { Observable, Observer, Subscription, timer, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, tap, takeUntil, switchMap } from 'rxjs/operators';
import { FakehttpService } from './fakehttp.service';

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

  // private observable1: Observable<number> = Observable.create(this.subs);
  private observable1: Observable<number> = Observable.create(this.noLimitNumbers);
  private subscription: Subscription;

  private subject = new ReplaySubject<number>(2);

  public output: string;

  public now = Observable.create(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  private observ1: Observer<number> = {
    next: x => console.log(`Observer 1: ${x}`),
    error: err => console.error(`Error 1: ${err}`),
    complete: () => console.log(`Finito 1`)
  };

  private observ2: Observer<number> = {
    next: x => console.log(`Observer 2: ${x}`),
    error: err => console.error(`Error 2: ${err}`),
    complete: () => console.log(`Finito 2`)
  };

  public makeSubjects() {
    this.subject.subscribe(this.observ1);
    this.subject.next(4);
    this.subject.next(5);
    this.subject.next(6);
    this.subject.subscribe(this.observ2);
    this.subject.next(7);
  }


  constructor(private commitsService: CommitsService,
    private tokenService: TokenService,
    private usersService: UsersService,
    private fakeHttpService: FakehttpService) {
  }

  private noLimitNumbers(observer: Observer<number>): Function {
    const i = setInterval(() => {
      console.log('No limit');
      observer.next(4);
    }, 1000);

    return function unsubscribe() {
      clearInterval(i);
    };
  }


  private subs(observer: Observer<number>): void {
    console.log('Flusso iniziato');
    observer.next(2);
    observer.next(4);
    setTimeout(() => observer.next(6), 2000);
    observer.next(8);
    // observer.complete();
    // observer.error('Errore'); // errore
    // observer.next(4); // errore
  }

  public start(): void {
    this.subscription = this.observable1.subscribe({
      next: x => console.log(`Valore ricevuto: ${x}`),
      error: err => console.error(`Grave errore: ${err}`),
      complete: () => console.log('Finito')
    });
  }

  public startNumberGenerator() {
    const randomObservable = Observable.create(this.randomGenerator);
    this.subscription = randomObservable
      .pipe(
        takeUntil(timer(4000)),
        tap(n => console.log(`prima di filter ${n}`)),
        filter(n => n >= 80)
      ).subscribe(
        x => console.log(x)
      );
  }


  public fakeHttp() {
    // this.subscription = this.fakeHttpService.fakeHttp('FAKE1', 2500)
    //   .subscribe(x => console.log(x));
    // this.subscription.add(this.fakeHttpService.fakeHttp('FAKE2', 500)
    //   .subscribe(x => console.log(x)));
    const sourceObservable = this.fakeHttpService.fakeHttp('FAKE1', 3000);
    const resultObservable = sourceObservable.pipe(switchMap(valore => {
      return this.fakeHttpService.fakeHttp(`FAKE2 ${valore}`, 200);
    }));
    this.subscription = resultObservable.subscribe(x => {
      this.output = x;
      console.log(x);
    });
  }

  private randomGenerator(observer: Observer<number>): Function {
    const i = setInterval(() => {
      const v = Math.floor(Math.random() * 100);
      observer.next(v);
    }, 500);

    return function unsubscribe() {
      clearInterval(i);
    };
  }

  public stop(): void {
    this.subscription.unsubscribe();
  }

  public retrieveCommits(): void {
    this.commitsService.retrieveCommits().subscribe(
      commits => this.commits = commits);
  }

  public retrieveUsers(): void {
    this.usersService.retrieveUsers().subscribe({
      next: userPage => this.users = userPage.data,
      error: err => console.error(err)
    });
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


  public add(x, y) {
    return x + y;
  }

  public add10(x, add10reference) {
    return add10reference(10, x);
  }

  public click(): void {
    console.log(this.add10(3, this.add));
    const m = [1, 2, 3, 4].map(n => this.multiply(n, 5));
    console.log(m);
    setTimeout(() => console.log('delayed'), 2000);
  }

  public click2(): void {
    const req = new XMLHttpRequest();
    req.onload = this.logRequest;
    // req.open('GET', 'https://reqres.in/api/users?page=1', true);
    req.open('GET', 'https://reqres.in/api/users?delay=10', false);
    req.send();
  }
  callback = function () {
    console.log('Attenti');
  };

  public click3(): void {

    this.higherOrderFunction(this.callback);
  }

  public higherOrderFunction(callback: Function) {
    callback();
  }

  private multiply(n: number, multiplier: number) {
    return n * multiplier;
  }

  private logRequest = function () {
    console.log(this.responseText);
  };

}
