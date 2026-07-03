import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortWorthTx } from './fort-worth-tx';

describe('FortWorthTx', () => {
  let component: FortWorthTx;
  let fixture: ComponentFixture<FortWorthTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FortWorthTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FortWorthTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
