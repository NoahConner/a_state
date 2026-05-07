import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmallBusinessHealthInsurance } from './small-business-health-insurance';


describe('SmallBusinessHealthInsurance', () => {
  let component: SmallBusinessHealthInsurance;
  let fixture: ComponentFixture<SmallBusinessHealthInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallBusinessHealthInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SmallBusinessHealthInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
