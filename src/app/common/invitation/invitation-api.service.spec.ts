import { TestBed } from '@angular/core/testing';

import { InvitationApiService } from './invitation-api.service';

describe('InvitationApiService', () => {
  let service: InvitationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
