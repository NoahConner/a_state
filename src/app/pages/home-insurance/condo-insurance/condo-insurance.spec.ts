import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondoInsurance } from './condo-insurance';

describe('CondoInsurance', () => {
  let component: CondoInsurance;
  let fixture: ComponentFixture<CondoInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CondoInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CondoInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
