import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriscoTx } from './frisco-tx';

describe('FriscoTx', () => {
  let component: FriscoTx;
  let fixture: ComponentFixture<FriscoTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FriscoTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriscoTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
