import { TestBed } from '@angular/core/testing';

import { SupportticketService } from './supportticket.service';

describe('SupportticketService', () => {
  let service: SupportticketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportticketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
