import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsurance } from './health-insurance';

describe('HealthInsurance', () => {
  let component: HealthInsurance;
  let fixture: ComponentFixture<HealthInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HealthInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
