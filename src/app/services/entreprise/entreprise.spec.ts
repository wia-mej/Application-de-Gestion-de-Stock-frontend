import { TestBed } from '@angular/core/testing';

import { Entreprise } from './entreprise';

describe('Entreprise', () => {
  let service: Entreprise;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Entreprise);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
