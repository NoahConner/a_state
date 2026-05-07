import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTermHealthInsurance } from './short-term-health-insurance';

describe('ShortTermHealthInsurance', () => {
  let component: ShortTermHealthInsurance;
  let fixture: ComponentFixture<ShortTermHealthInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortTermHealthInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShortTermHealthInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
