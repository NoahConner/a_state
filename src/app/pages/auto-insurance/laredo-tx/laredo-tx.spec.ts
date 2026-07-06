import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaredoTx } from './laredo-tx';

describe('LaredoTx', () => {
  let component: LaredoTx;
  let fixture: ComponentFixture<LaredoTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaredoTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaredoTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
