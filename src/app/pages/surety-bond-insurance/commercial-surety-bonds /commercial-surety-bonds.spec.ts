import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommercialSuretyBonds } from './commercial-surety-bonds';


describe('CommercialSuretyBonds', () => {
  let component: CommercialSuretyBonds;
  let fixture: ComponentFixture<CommercialSuretyBonds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommercialSuretyBonds]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommercialSuretyBonds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
