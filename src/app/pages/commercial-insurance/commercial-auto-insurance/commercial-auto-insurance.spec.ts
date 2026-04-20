import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialAutoInsurance } from './commercial-auto-insurance';

describe('CommercialAutoInsurance', () => {
  let component: CommercialAutoInsurance;
  let fixture: ComponentFixture<CommercialAutoInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommercialAutoInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommercialAutoInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
