import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetLifeQuote } from './get-life-quote';

describe('GetLifeQuote', () => {
  let component: GetLifeQuote;
  let fixture: ComponentFixture<GetLifeQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetLifeQuote],
    }).compileComponents();

    fixture = TestBed.createComponent(GetLifeQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
