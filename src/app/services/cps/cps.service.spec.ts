import { TestBed } from '@angular/core/testing';

import { CpsService } from './cps.service';

describe('CpsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpsService = TestBed.get(CpsService);
    expect(service).toBeTruthy();
  });
});
