import { TestBed } from '@angular/core/testing';

import { AnalyticsreportService } from './analyticsreport.service';

describe('AnalyticsreportService', () => {
  let service: AnalyticsreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
