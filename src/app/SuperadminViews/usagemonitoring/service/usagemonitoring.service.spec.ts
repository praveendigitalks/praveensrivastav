import { TestBed } from '@angular/core/testing';

import { UsagemonitoringService } from './usagemonitoring.service';

describe('UsagemonitoringService', () => {
  let service: UsagemonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsagemonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
