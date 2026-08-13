import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanAngeloTx } from './san-angelo-tx';

describe('SanAngeloTx', () => {
  let component: SanAngeloTx;
  let fixture: ComponentFixture<SanAngeloTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanAngeloTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanAngeloTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
