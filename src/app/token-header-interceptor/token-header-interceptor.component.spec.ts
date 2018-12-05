import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenHeaderInterceptorComponent } from './token-header-interceptor.component';

describe('TokenHeaderInterceptorComponent', () => {
  let component: TokenHeaderInterceptorComponent;
  let fixture: ComponentFixture<TokenHeaderInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenHeaderInterceptorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenHeaderInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
