import { TestBed, inject } from '@angular/core/testing';

import { SentimientoService } from './sentimiento.service';

describe('SentimientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentimientoService]
    });
  });

  it('should be created', inject([SentimientoService], (service: SentimientoService) => {
    expect(service).toBeTruthy();
  }));
});
