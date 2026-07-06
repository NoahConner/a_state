import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArlingtonTx } from './arlington-tx';

describe('ArlingtonTx', () => {
  let component: ArlingtonTx;
  let fixture: ComponentFixture<ArlingtonTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArlingtonTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArlingtonTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
