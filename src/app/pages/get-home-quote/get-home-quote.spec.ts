import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetHomeQuote } from './get-home-quote';

describe('GetHomeQuote', () => {
  let component: GetHomeQuote;
  let fixture: ComponentFixture<GetHomeQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetHomeQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(GetHomeQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
