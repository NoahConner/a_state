import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalLiabilityInsurance } from './professional-liability-insurance';

describe('ProfessionalLiabilityInsurance', () => {
  let component: ProfessionalLiabilityInsurance;
  let fixture: ComponentFixture<ProfessionalLiabilityInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalLiabilityInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfessionalLiabilityInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
