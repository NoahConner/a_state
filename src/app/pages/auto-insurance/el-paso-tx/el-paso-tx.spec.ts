import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElPasoTx } from './el-paso-tx';

describe('ElPasoTx', () => {
  let component: ElPasoTx;
  let fixture: ComponentFixture<ElPasoTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElPasoTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElPasoTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
