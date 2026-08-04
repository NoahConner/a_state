import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllenTx } from './allen-tx';

describe('AllenTx', () => {
  let component: AllenTx;
  let fixture: ComponentFixture<AllenTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllenTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllenTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
