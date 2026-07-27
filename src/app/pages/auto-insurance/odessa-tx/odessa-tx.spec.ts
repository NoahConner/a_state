import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdessaTx } from './odessa-tx';

describe('OdessaTx', () => {
  let component: OdessaTx;
  let fixture: ComponentFixture<OdessaTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OdessaTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdessaTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
