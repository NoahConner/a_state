import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentonTx } from './denton-tx';

describe('DentonTx', () => {
  let component: DentonTx;
  let fixture: ComponentFixture<DentonTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DentonTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentonTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
