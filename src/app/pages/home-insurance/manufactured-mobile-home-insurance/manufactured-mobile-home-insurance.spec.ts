import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturedMobileHomeInsurance } from './manufactured-mobile-home-insurance';

describe('ManufacturedMobileHomeInsurance', () => {
  let component: ManufacturedMobileHomeInsurance;
  let fixture: ComponentFixture<ManufacturedMobileHomeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufacturedMobileHomeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManufacturedMobileHomeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
