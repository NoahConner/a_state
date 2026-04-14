import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakeInsurance } from './earthquake-insurance';

describe('EarthquakeInsurance', () => {
  let component: EarthquakeInsurance;
  let fixture: ComponentFixture<EarthquakeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EarthquakeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EarthquakeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
