import { TestBed, inject } from '@angular/core/testing';

import { InstintoService } from './instinto.service';

describe('InstintoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstintoService]
    });
  });

  it('should be created', inject([InstintoService], (service: InstintoService) => {
    expect(service).toBeTruthy();
  }));
});
