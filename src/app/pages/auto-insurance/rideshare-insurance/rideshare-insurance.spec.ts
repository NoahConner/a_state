import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideshareInsurance } from './rideshare-insurance';

describe('RideshareInsurance', () => {
  let component: RideshareInsurance;
  let fixture: ComponentFixture<RideshareInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RideshareInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RideshareInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
