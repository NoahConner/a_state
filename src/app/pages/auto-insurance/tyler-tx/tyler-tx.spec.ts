import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TylerTx } from './tyler-tx';

describe('TylerTx', () => {
  let component: TylerTx;
  let fixture: ComponentFixture<TylerTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TylerTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TylerTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
