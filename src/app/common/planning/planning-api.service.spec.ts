import { TestBed } from '@angular/core/testing';

import { PlanningApiService } from './planning-api.service';

describe('PlanningApiService', () => {
  let service: PlanningApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
