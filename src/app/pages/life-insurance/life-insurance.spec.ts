import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeInsurance } from './life-insurance';

describe('LifeInsurance', () => {
  let component: LifeInsurance;
  let fixture: ComponentFixture<LifeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LifeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
