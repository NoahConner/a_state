import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInsurance } from './home-insurance';

describe('HomeInsurance', () => {
  let component: HomeInsurance;
  let fixture: ComponentFixture<HomeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
