import { TestBed } from '@angular/core/testing';

import { LocalDBserviceService } from './local-dbservice.service';

describe('LocalDBserviceService', () => {
  let service: LocalDBserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDBserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
