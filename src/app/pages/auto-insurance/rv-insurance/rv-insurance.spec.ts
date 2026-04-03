import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvInsurance } from './rv-insurance';

describe('RvInsurance', () => {
  let component: RvInsurance;
  let fixture: ComponentFixture<RvInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RvInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RvInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
