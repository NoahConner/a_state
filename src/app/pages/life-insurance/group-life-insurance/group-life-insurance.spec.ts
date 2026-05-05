import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLifeInsurance } from './group-life-insurance';

describe('GroupLifeInsurance', () => {
  let component: GroupLifeInsurance;
  let fixture: ComponentFixture<GroupLifeInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupLifeInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupLifeInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
