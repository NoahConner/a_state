import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbileneTx } from './abilene-tx';

describe('AbileneTx', () => {
  let component: AbileneTx;
  let fixture: ComponentFixture<AbileneTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbileneTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbileneTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
