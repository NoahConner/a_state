import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerInsurance } from './trailer-insurance';

describe('TrailerInsurance', () => {
  let component: TrailerInsurance;
  let fixture: ComponentFixture<TrailerInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailerInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrailerInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
