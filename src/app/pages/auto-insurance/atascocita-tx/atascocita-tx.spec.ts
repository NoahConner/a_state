import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtascocitaTx } from './atascocita-tx';

describe('AtascocitaTx', () => {
  let component: AtascocitaTx;
  let fixture: ComponentFixture<AtascocitaTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtascocitaTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtascocitaTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
