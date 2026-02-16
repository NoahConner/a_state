import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceServices } from './insurance-services';

describe('InsuranceServices', () => {
  let component: InsuranceServices;
  let fixture: ComponentFixture<InsuranceServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsuranceServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
