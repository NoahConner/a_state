import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConroeTx } from './conroe-tx';

describe('ConroeTx', () => {
  let component: ConroeTx;
  let fixture: ComponentFixture<ConroeTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConroeTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConroeTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
