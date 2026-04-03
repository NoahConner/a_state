import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MexicanCarInsurance } from './mexican-car-insurance';

describe('MexicanCarInsurance', () => {
  let component: MexicanCarInsurance;
  let fixture: ComponentFixture<MexicanCarInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MexicanCarInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MexicanCarInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
