import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodInsurance } from './flood-insurance';

describe('FloodInsurance', () => {
  let component: FloodInsurance;
  let fixture: ComponentFixture<FloodInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloodInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FloodInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
