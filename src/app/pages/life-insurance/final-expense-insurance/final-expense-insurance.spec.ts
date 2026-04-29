import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalExpenseInsurance } from './final-expense-insurance';

describe('FinalExpenseInsurance', () => {
  let component: FinalExpenseInsurance;
  let fixture: ComponentFixture<FinalExpenseInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalExpenseInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinalExpenseInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
