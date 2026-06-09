import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { MetaService } from './meta-service';

describe('MetaService', () => {
  let service: MetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Title, useValue: { setTitle: () => void 0 } },
        { provide: Meta, useValue: { updateTag: () => null } },
      ],
    });
    service = TestBed.inject(MetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
