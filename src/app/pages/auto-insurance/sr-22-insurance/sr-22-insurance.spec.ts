import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sr22Insurance } from './sr-22-insurance';

describe('Sr22Insurance', () => {
  let component: Sr22Insurance;
  let fixture: ComponentFixture<Sr22Insurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sr22Insurance]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Sr22Insurance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
