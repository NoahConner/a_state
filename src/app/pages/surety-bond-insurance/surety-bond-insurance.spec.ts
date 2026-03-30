import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuretyBondInsurance } from './surety-bond-insurance';

describe('SuretyBondInsurance', () => {
  let component: SuretyBondInsurance;
  let fixture: ComponentFixture<SuretyBondInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuretyBondInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuretyBondInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
