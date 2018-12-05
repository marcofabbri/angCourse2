import { Component } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-token-header-interceptor',
  templateUrl: './token-header-interceptor.component.html',
  styleUrls: ['./token-header-interceptor.component.css']
})
export class TokenHeaderInterceptorComponent implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor');
    const token = this.tokenService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `token ${token}`
      }
    });
    return next.handle(request);
  }

}
