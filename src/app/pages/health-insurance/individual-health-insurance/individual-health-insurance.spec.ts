import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualHealthInsurance } from './individual-health-insurance';


describe('IndividualHealthInsurance', () => {
  let component: IndividualHealthInsurance;
  let fixture: ComponentFixture<IndividualHealthInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndividualHealthInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IndividualHealthInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
