import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleTx } from './temple-tx';

describe('TempleTx', () => {
  let component: TempleTx;
  let fixture: ComponentFixture<TempleTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TempleTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempleTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
