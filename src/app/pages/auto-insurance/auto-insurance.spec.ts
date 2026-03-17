import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoInsurance } from './auto-insurance';

describe('AutoInsurance', () => {
  let component: AutoInsurance;
  let fixture: ComponentFixture<AutoInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoInsurance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
