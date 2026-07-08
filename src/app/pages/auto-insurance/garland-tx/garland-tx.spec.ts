import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarlandTx } from './garland-tx';

describe('GarlandTx', () => {
  let component: GarlandTx;
  let fixture: ComponentFixture<GarlandTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GarlandTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarlandTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
