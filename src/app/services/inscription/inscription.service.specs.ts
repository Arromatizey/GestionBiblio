import { TestBed } from '@angular/core/testing';

import { InscriptionService } from './inscription.service';

describe('AuthService', () => {
  let service: InscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
