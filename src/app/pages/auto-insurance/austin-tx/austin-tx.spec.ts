import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AustinTx } from './austin-tx';

describe('AustinTx', () => {
  let component: AustinTx;
  let fixture: ComponentFixture<AustinTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AustinTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AustinTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
