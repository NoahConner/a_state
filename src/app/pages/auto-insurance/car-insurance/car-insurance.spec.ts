import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsurance } from './car-insurance';

describe('CarInsurance', () => {
  let component: CarInsurance;
  let fixture: ComponentFixture<CarInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarInsurance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
