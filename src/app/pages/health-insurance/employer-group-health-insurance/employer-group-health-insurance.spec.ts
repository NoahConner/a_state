import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerGroupHealthInsurance } from './employer-group-health-insurance';


describe('EmployerGroupHealthInsurance', () => {
  let component: EmployerGroupHealthInsurance;
  let fixture: ComponentFixture<EmployerGroupHealthInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployerGroupHealthInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmployerGroupHealthInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
