import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TokenHeaderInterceptorComponent } from './token-header-interceptor/token-header-interceptor.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenHeaderInterceptorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHeaderInterceptorComponent,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
