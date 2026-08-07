import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { landingPageGuardGuard } from './landing-page-guard-guard';

describe('landingPageGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => landingPageGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
