import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAutoQuote } from './get-auto-quote';

describe('GetAutoQuote', () => {
  let component: GetAutoQuote;
  let fixture: ComponentFixture<GetAutoQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAutoQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(GetAutoQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
