import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BidBonds } from './bid-bonds';


describe('BidBonds', () => {
  let component: BidBonds;
  let fixture: ComponentFixture<BidBonds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BidBonds]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BidBonds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
