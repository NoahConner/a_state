import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugarLandTx } from './sugar-land-tx';

describe('SugarLandTx', () => {
  let component: SugarLandTx;
  let fixture: ComponentFixture<SugarLandTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SugarLandTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugarLandTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
