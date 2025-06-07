import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeLoanComponent } from './home-loan.component';

describe('HomeLoanComponent', () => {
  let component: HomeLoanComponent;
  let fixture: ComponentFixture<HomeLoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
