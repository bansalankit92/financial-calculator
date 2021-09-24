import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonalLoanComponent } from './personal-loan.component';

describe('PersonalLoanComponent', () => {
  let component: PersonalLoanComponent;
  let fixture: ComponentFixture<PersonalLoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
