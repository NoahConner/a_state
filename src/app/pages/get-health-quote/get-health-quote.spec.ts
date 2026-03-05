import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetHealthQuote } from './get-health-quote';

describe('GetHealthQuote', () => {
  let component: GetHealthQuote;
  let fixture: ComponentFixture<GetHealthQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetHealthQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(GetHealthQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
