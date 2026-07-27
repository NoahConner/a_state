import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichardsonTx } from './richardson-tx';

describe('RichardsonTx', () => {
  let component: RichardsonTx;
  let fixture: ComponentFixture<RichardsonTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RichardsonTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichardsonTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
