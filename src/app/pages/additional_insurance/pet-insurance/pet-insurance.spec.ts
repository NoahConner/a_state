import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetInsurance } from './pet-insurance';


describe('PetInsurance', () => {
  let component: PetInsurance;
  let fixture: ComponentFixture<PetInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PetInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
