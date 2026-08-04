import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBraunfelsTx } from './new-braunfels-tx';

describe('NewBraunfelsTx', () => {
  let component: NewBraunfelsTx;
  let fixture: ComponentFixture<NewBraunfelsTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBraunfelsTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBraunfelsTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
