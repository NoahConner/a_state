import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrownsvilleTx } from './brownsville-tx';

describe('BrownsvilleTx', () => {
  let component: BrownsvilleTx;
  let fixture: ComponentFixture<BrownsvilleTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrownsvilleTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrownsvilleTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
