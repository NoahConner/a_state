import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LubbockTx } from './lubbock-tx';

describe('LubbockTx', () => {
  let component: LubbockTx;
  let fixture: ComponentFixture<LubbockTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LubbockTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LubbockTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
