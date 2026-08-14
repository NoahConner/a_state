import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BryanTx } from './bryan-tx';

describe('BryanTx', () => {
  let component: BryanTx;
  let fixture: ComponentFixture<BryanTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BryanTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BryanTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
