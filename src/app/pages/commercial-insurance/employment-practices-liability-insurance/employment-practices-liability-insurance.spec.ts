import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentPracticesLiabilityInsurance } from './employment-practices-liability-insurance';

describe('EmploymentPracticesLiabilityInsurance', () => {
  let component: EmploymentPracticesLiabilityInsurance;
  let fixture: ComponentFixture<EmploymentPracticesLiabilityInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmploymentPracticesLiabilityInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmploymentPracticesLiabilityInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
