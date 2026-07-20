import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesquiteTx } from './mesquite-tx';

describe('MesquiteTx', () => {
  let component: MesquiteTx;
  let fixture: ComponentFixture<MesquiteTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesquiteTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesquiteTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
