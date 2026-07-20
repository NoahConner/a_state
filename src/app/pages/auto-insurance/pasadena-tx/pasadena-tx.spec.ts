import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasadenaTx } from './pasadena-tx';

describe('PasadenaTx', () => {
  let component: PasadenaTx;
  let fixture: ComponentFixture<PasadenaTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasadenaTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasadenaTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
