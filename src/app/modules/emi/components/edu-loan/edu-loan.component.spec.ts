import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EduLoanComponent } from './edu-loan.component';

describe('EduLoanComponent', () => {
  let component: EduLoanComponent;
  let fixture: ComponentFixture<EduLoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EduLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
