import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLifeInsurance } from './term-life-insurance';

describe('TermLifeInsurance', () => {
  let component: TermLifeInsurance;
  let fixture: ComponentFixture<TermLifeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermLifeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TermLifeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
