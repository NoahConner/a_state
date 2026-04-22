import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildersRiskInsurance } from './builders-risk-insurance';

describe('BuildersRiskInsurance', () => {
  let component: BuildersRiskInsurance;
  let fixture: ComponentFixture<BuildersRiskInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildersRiskInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BuildersRiskInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
