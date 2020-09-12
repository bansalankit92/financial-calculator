import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLoanComponent } from './personal-loan.component';

describe('PersonalLoanComponent', () => {
  let component: PersonalLoanComponent;
  let fixture: ComponentFixture<PersonalLoanComponent>;

  beforeEach(async(() => {
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
