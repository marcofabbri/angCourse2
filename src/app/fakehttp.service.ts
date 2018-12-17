import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakehttpService {

  constructor() { }

  public fakeHttp(val: any, d: number): Observable<any> {
    return interval(d).pipe(map(index => `${val} - ${index}`));
  }
}
