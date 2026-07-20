import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LewisvilleTx } from './lewisville-tx';

describe('LewisvilleTx', () => {
  let component: LewisvilleTx;
  let fixture: ComponentFixture<LewisvilleTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LewisvilleTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LewisvilleTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
