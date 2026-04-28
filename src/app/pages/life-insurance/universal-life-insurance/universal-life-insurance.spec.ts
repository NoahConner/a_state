import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalLifeInsurance } from './universal-life-insurance';

describe('UniversalLifeInsurance', () => {
  let component: UniversalLifeInsurance;
  let fixture: ComponentFixture<UniversalLifeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniversalLifeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UniversalLifeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
