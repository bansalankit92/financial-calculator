import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RdComponent } from './rd.component';

describe('RdComponent', () => {
  let component: RdComponent;
  let fixture: ComponentFixture<RdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
