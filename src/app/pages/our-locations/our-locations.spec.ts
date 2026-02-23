import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurLocations } from './our-locations';

describe('OurLocations', () => {
  let component: OurLocations;
  let fixture: ComponentFixture<OurLocations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurLocations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurLocations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
