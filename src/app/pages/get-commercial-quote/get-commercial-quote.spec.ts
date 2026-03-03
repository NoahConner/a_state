import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetCommercialQuote } from './get-commercial-quote';

describe('GetCommercialQuote', () => {
  let component: GetCommercialQuote;
  let fixture: ComponentFixture<GetCommercialQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetCommercialQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(GetCommercialQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
