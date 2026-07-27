import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheWoodlandsTx } from './the-woodlands-tx';

describe('TheWoodlandsTx', () => {
  let component: TheWoodlandsTx;
  let fixture: ComponentFixture<TheWoodlandsTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheWoodlandsTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheWoodlandsTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
