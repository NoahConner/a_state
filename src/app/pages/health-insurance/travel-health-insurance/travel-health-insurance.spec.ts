import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelHealthInsurance } from './travel-health-insurance';


describe('TravelHealthInsurance', () => {
  let component: TravelHealthInsurance;
  let fixture: ComponentFixture<TravelHealthInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelHealthInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TravelHealthInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
