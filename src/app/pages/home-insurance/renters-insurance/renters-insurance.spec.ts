import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentersInsurance } from './renters-insurance';

describe('RentersInsurance', () => {
  let component: RentersInsurance;
  let fixture: ComponentFixture<RentersInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentersInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RentersInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
