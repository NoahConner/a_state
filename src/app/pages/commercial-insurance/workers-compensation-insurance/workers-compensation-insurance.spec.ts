import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersCompensationInsurance } from './workers-compensation-insurance';

describe('WorkersCompensationInsurance', () => {
  let component: WorkersCompensationInsurance;
  let fixture: ComponentFixture<WorkersCompensationInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersCompensationInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WorkersCompensationInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
