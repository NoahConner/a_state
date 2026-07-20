import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrolltonTx } from './carrollton-tx';

describe('CarrolltonTx', () => {
  let component: CarrolltonTx;
  let fixture: ComponentFixture<CarrolltonTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrolltonTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrolltonTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
