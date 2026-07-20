import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MckinneyTx } from './mckinney-tx';

describe('MckinneyTx', () => {
  let component: MckinneyTx;
  let fixture: ComponentFixture<MckinneyTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MckinneyTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MckinneyTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
