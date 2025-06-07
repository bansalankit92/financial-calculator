import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetirementComponent } from './retirement.component';

describe('RetirementComponent', () => {
  let component: RetirementComponent;
  let fixture: ComponentFixture<RetirementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
