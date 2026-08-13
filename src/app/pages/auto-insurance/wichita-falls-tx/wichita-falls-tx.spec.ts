import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WichitaFallsTx } from './wichita-falls-tx';

describe('WichitaFallsTx', () => {
  let component: WichitaFallsTx;
  let fixture: ComponentFixture<WichitaFallsTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WichitaFallsTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WichitaFallsTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
