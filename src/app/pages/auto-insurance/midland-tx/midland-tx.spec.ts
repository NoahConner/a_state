import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidlandTx } from './midland-tx';

describe('MidlandTx', () => {
  let component: MidlandTx;
  let fixture: ComponentFixture<MidlandTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MidlandTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MidlandTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
