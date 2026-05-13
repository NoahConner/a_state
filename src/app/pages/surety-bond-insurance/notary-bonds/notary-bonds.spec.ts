import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaryBonds } from './notary-bonds';


describe('NotaryBonds', () => {
  let component: NotaryBonds;
  let fixture: ComponentFixture<NotaryBonds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotaryBonds]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotaryBonds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
