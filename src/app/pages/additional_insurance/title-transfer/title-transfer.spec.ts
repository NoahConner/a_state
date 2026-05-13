import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleTransfer } from './title-transfer';


describe('TitleTransfer', () => {
  let component: TitleTransfer;
  let fixture: ComponentFixture<TitleTransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleTransfer]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TitleTransfer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
