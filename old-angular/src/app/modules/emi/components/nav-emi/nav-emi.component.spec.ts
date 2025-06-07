import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavEmiComponent } from './nav-emi.component';

describe('NavEmiComponent', () => {
  let component: NavEmiComponent;
  let fixture: ComponentFixture<NavEmiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavEmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
