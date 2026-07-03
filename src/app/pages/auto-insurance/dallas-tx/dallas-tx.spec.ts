import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DallasTx } from './dallas-tx';

describe('DallasTx', () => {
  let component: DallasTx;
  let fixture: ComponentFixture<DallasTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DallasTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DallasTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
