import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectorsOfficersLiabilityInsurance } from './directors-officers-liability-insurance';


describe('DirectorsOfficersLiabilityInsurance', () => {
  let component: DirectorsOfficersLiabilityInsurance;
  let fixture: ComponentFixture<DirectorsOfficersLiabilityInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorsOfficersLiabilityInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DirectorsOfficersLiabilityInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
