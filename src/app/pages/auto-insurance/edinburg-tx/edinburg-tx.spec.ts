import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdinburgTx } from './edinburg-tx';

describe('EdinburgTx', () => {
  let component: EdinburgTx;
  let fixture: ComponentFixture<EdinburgTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdinburgTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdinburgTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
