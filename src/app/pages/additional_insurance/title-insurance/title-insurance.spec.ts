import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleInsurance } from './title-insurance';


describe('TitleInsurance', () => {
  let component: TitleInsurance;
  let fixture: ComponentFixture<TitleInsurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleInsurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TitleInsurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
