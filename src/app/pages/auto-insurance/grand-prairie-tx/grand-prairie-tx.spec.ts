import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandPrairieTx } from './grand-prairie-tx';

describe('GrandPrairieTx', () => {
  let component: GrandPrairieTx;
  let fixture: ComponentFixture<GrandPrairieTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrandPrairieTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrandPrairieTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
