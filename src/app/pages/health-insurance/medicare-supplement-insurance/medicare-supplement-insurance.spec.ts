import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicareSupplementInsurance } from './medicare-supplement-insurance';


describe('MedicareSupplementInsurance', () => {
  let component: MedicareSupplementInsurance;
  let fixture: ComponentFixture<MedicareSupplementInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicareSupplementInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MedicareSupplementInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
