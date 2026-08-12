import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeorgetownTx } from './georgetown-tx';

describe('GeorgetownTx', () => {
  let component: GeorgetownTx;
  let fixture: ComponentFixture<GeorgetownTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeorgetownTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeorgetownTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
