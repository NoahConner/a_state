import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaytownTx } from './baytown-tx';

describe('BaytownTx', () => {
  let component: BaytownTx;
  let fixture: ComponentFixture<BaytownTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaytownTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaytownTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
