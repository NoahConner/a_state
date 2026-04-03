import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatInsurance } from './boat-insurance';

describe('BoatInsurance', () => {
  let component: BoatInsurance;
  let fixture: ComponentFixture<BoatInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoatInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoatInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
