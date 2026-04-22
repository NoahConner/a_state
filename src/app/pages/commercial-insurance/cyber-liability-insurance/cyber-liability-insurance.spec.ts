import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberLiabilityInsurance } from './cyber-liability-insurance';

describe('CyberLiabilityInsurance', () => {
  let component: CyberLiabilityInsurance;
  let fixture: ComponentFixture<CyberLiabilityInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CyberLiabilityInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CyberLiabilityInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
