import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarilloTx } from './amarillo-tx';

describe('AmarilloTx', () => {
  let component: AmarilloTx;
  let fixture: ComponentFixture<AmarilloTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmarilloTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmarilloTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
