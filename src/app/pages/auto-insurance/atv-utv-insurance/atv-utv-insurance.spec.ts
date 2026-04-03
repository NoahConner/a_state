import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtvAndUtvInsurance } from './atv-utv-insurance';

describe('AtvAndUtvInsurance', () => {
  let component: AtvAndUtvInsurance;
  let fixture: ComponentFixture<AtvAndUtvInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtvAndUtvInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AtvAndUtvInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
