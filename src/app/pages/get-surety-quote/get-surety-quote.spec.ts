import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetSuretyQuote } from './get-surety-quote';

describe('GetSuretyQuote', () => {
  let component: GetSuretyQuote;
  let fixture: ComponentFixture<GetSuretyQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetSuretyQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(GetSuretyQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
