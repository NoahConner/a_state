import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcycleInsurance } from './motorcycle-insurance';

describe('MotorcycleInsurance', () => {
  let component: MotorcycleInsurance;
  let fixture: ComponentFixture<MotorcycleInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotorcycleInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MotorcycleInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
