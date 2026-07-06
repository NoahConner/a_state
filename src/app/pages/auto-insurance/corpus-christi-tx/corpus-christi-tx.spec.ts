import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpusChristiTx } from './corpus-christi-tx';

describe('CorpusChristiTx', () => {
  let component: CorpusChristiTx;
  let fixture: ComponentFixture<CorpusChristiTx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorpusChristiTx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorpusChristiTx);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
