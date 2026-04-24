import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeLifeInsurance } from './whole-life-insurance';

describe('WholeLifeInsurance', () => {
  let component: WholeLifeInsurance;
  let fixture: ComponentFixture<WholeLifeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WholeLifeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WholeLifeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
