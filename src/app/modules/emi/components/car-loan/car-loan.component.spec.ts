import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLoanComponent } from './car-loan.component';

describe('CarLoanComponent', () => {
  let component: CarLoanComponent;
  let fixture: ComponentFixture<CarLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
