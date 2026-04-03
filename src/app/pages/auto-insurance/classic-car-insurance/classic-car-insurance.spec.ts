import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicCarInsurance } from './classic-car-insurance';

describe('ClassicCarInsurance', () => {
  let component: ClassicCarInsurance;
  let fixture: ComponentFixture<ClassicCarInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassicCarInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClassicCarInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
