import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeStationTx } from './college-station-tx';

describe('CollegeStationTx', () => {
  let component: CollegeStationTx;
  let fixture: ComponentFixture<CollegeStationTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollegeStationTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollegeStationTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
