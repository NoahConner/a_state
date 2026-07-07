import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrvingTx } from './irving-tx';

describe('IrvingTx', () => {
  let component: IrvingTx;
  let fixture: ComponentFixture<IrvingTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IrvingTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrvingTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
