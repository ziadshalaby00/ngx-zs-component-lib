import { TestBed } from '@angular/core/testing';

import { VisibilityObserverService } from './visibility-observer-service';

describe('VisibilityObserverService', () => {
  let service: VisibilityObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisibilityObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
