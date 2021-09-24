import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinancialFreedomComponent } from './financial-freedom.component';

describe('FinancialFreedomComponent', () => {
  let component: FinancialFreedomComponent;
  let fixture: ComponentFixture<FinancialFreedomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialFreedomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialFreedomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
