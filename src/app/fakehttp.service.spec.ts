import { TestBed, inject } from '@angular/core/testing';

import { FakehttpService } from './fakehttp.service';

describe('FakehttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakehttpService]
    });
  });

  it('should be created', inject([FakehttpService], (service: FakehttpService) => {
    expect(service).toBeTruthy();
  }));
});
