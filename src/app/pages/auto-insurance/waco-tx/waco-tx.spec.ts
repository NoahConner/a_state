import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WacoTx } from './waco-tx';

describe('WacoTx', () => {
  let component: WacoTx;
  let fixture: ComponentFixture<WacoTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WacoTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WacoTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
