import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetCustomQuote } from './get-custom-quote';

describe('GetCustomQuote', () => {
  let component: GetCustomQuote;
  let fixture: ComponentFixture<GetCustomQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetCustomQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(GetCustomQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
