import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoTx } from './plano-tx';

describe('PlanoTx', () => {
  let component: PlanoTx;
  let fixture: ComponentFixture<PlanoTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanoTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanoTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
