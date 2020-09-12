import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEmiComponent } from './nav-emi.component';

describe('NavEmiComponent', () => {
  let component: NavEmiComponent;
  let fixture: ComponentFixture<NavEmiComponent>;

  beforeEach(async(() => {
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
