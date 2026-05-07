import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyHealthInsurance } from './family-health-insurance';

describe('FamilyHealthInsurance', () => {
  let component: FamilyHealthInsurance;
  let fixture: ComponentFixture<FamilyHealthInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyHealthInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FamilyHealthInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
