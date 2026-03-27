import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialInsurance } from './commercial-insurance';

describe('CommercialInsurance', () => {
  let component: CommercialInsurance;
  let fixture: ComponentFixture<CommercialInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommercialInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommercialInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
