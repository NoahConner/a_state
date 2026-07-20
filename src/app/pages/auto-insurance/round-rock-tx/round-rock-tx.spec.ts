import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundRockTx } from './round-rock-tx';

describe('RoundRockTx', () => {
  let component: RoundRockTx;
  let fixture: ComponentFixture<RoundRockTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoundRockTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundRockTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
