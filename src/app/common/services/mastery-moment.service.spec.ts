import { TestBed } from '@angular/core/testing';

import { MasteryMomentService } from './mastery-moment.service';

describe('MasteryMomentService', () => {
  let service: MasteryMomentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasteryMomentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
