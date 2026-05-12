import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcaMarketplacePlansInsurance } from './aca-marketplace-plans-insurance';


describe('AcaMarketplacePlansInsurance', () => {
  let component: AcaMarketplacePlansInsurance;
  let fixture: ComponentFixture<AcaMarketplacePlansInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcaMarketplacePlansInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcaMarketplacePlansInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
