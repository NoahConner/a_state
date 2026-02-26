import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAQuote } from './get-a-quote';


describe('GetAQuote', () => {
  let component: GetAQuote;
  let fixture: ComponentFixture<GetAQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAQuote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAQuote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
