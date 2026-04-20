import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialPropertyInsurance } from './commercial-property-insurance';

describe('CommercialPropertyInsurance', () => {
  let component: CommercialPropertyInsurance;
  let fixture: ComponentFixture<CommercialPropertyInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommercialPropertyInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommercialPropertyInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
