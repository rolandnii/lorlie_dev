import { TestBed } from '@angular/core/testing';

import { PorfoilioService } from './porfoilio.service';

describe('PorfoilioService', () => {
  let service: PorfoilioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorfoilioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
