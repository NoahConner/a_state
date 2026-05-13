import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerformanceBondsPaymentBonds } from './performance-bonds-payment-bonds';


describe('PerformanceBondsPaymentBonds', () => {
  let component: PerformanceBondsPaymentBonds;
  let fixture: ComponentFixture<PerformanceBondsPaymentBonds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceBondsPaymentBonds]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceBondsPaymentBonds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
