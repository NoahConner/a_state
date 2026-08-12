import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTx } from './mission-tx';

describe('MissionTx', () => {
  let component: MissionTx;
  let fixture: ComponentFixture<MissionTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissionTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
