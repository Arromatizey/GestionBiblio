import { TestBed } from '@angular/core/testing';

import { EmpruntUserService } from './empruntUser.service';

describe('EmpruntUserService', () => {
  let service: EmpruntUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpruntUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
