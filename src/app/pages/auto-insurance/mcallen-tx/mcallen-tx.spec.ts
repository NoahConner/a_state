import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McallenTx } from './mcallen-tx';

describe('McallenTx', () => {
  let component: McallenTx;
  let fixture: ComponentFixture<McallenTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [McallenTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McallenTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
