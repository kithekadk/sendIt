import { TestBed } from '@angular/core/testing';

import { HideloginGuard } from './hidelogin.guard';

describe('HideloginGuard', () => {
  let guard: HideloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HideloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
