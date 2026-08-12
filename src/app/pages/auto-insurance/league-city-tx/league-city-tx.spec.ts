import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueCityTx } from './league-city-tx';

describe('LeagueCityTx', () => {
  let component: LeagueCityTx;
  let fixture: ComponentFixture<LeagueCityTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeagueCityTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueCityTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
