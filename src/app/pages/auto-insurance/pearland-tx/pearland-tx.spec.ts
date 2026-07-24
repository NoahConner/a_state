import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PearlandTx } from './pearland-tx';

describe('PearlandTx', () => {
  let component: PearlandTx;
  let fixture: ComponentFixture<PearlandTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PearlandTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PearlandTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
