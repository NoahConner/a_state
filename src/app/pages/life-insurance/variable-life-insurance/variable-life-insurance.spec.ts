import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableLifeInsurance } from './variable-life-insurance';

describe('VariableLifeInsurance', () => {
  let component: VariableLifeInsurance;
  let fixture: ComponentFixture<VariableLifeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VariableLifeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VariableLifeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
