import { TestBed, inject } from '@angular/core/testing';

import { LabserviceService } from './labservice.service';

describe('LabserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabserviceService]
    });
  });

  it('should be created', inject([LabserviceService], (service: LabserviceService) => {
    expect(service).toBeTruthy();
  }));
});
