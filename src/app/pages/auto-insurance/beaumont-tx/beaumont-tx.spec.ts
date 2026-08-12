import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaumontTx } from './beaumont-tx';

describe('BeaumontTx', () => {
  let component: BeaumontTx;
  let fixture: ComponentFixture<BeaumontTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeaumontTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeaumontTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
