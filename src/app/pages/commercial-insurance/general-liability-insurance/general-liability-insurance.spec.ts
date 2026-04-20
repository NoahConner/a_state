import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLiabilityInsurance } from './general-liability-insurance';

describe('GeneralLiabilityInsurance', () => {
  let component: GeneralLiabilityInsurance;
  let fixture: ComponentFixture<GeneralLiabilityInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralLiabilityInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GeneralLiabilityInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
