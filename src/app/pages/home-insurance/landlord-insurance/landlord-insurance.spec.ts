import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordInsurance } from './landlord-insurance';

describe('LandlordInsurance', () => {
  let component: LandlordInsurance;
  let fixture: ComponentFixture<LandlordInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandlordInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandlordInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
