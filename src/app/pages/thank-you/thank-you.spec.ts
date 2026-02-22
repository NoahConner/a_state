import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Thankyou } from './thank-you';

describe('Thankyou', () => {
  let component: Thankyou;
  let fixture: ComponentFixture<Thankyou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Thankyou],
    }).compileComponents();

    fixture = TestBed.createComponent(Thankyou);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
