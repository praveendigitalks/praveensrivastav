import { TestBed } from '@angular/core/testing';

import { BillingfinanceService } from './billingfinance.service';

describe('BillingfinanceService', () => {
  let service: BillingfinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingfinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
