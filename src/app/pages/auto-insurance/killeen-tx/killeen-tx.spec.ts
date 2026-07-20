import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KilleenTx } from './killeen-tx';

describe('KilleenTx', () => {
  let component: KilleenTx;
  let fixture: ComponentFixture<KilleenTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KilleenTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KilleenTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
