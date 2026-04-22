import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnerInsurance } from './business-owner-insurance';

describe('BusinessOwnerInsurance', () => {
  let component: BusinessOwnerInsurance;
  let fixture: ComponentFixture<BusinessOwnerInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessOwnerInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BusinessOwnerInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
