import { TestBed, inject } from '@angular/core/testing';

import { PensamientoService } from './pensamiento.service';

describe('PensamientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PensamientoService]
    });
  });

  it('should be created', inject([PensamientoService], (service: PensamientoService) => {
    expect(service).toBeTruthy();
  }));
});
