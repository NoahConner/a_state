import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalVisionInsurance } from './dental-vision-insurance';

describe('DentalVisionInsurance', () => {
  let component: DentalVisionInsurance;
  let fixture: ComponentFixture<DentalVisionInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DentalVisionInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DentalVisionInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
