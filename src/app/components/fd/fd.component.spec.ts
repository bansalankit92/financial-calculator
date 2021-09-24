import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FdComponent } from './fd.component';

describe('FdComponent', () => {
  let component: FdComponent;
  let fixture: ComponentFixture<FdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
