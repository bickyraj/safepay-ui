import { TestBed } from '@angular/core/testing';

import { PatientCaseService } from './patient-case.service';

describe('PatientCaseService', () => {
  let service: PatientCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
