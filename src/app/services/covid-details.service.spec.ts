import { TestBed } from '@angular/core/testing';

import { CovidDetailsService } from './covid-details.service';

describe('CovidDetailsService', () => {
  let service: CovidDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
