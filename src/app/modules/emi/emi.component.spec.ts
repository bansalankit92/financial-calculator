import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmiComponent } from './emi.component';

describe('EmiComponent', () => {
  let component: EmiComponent;
  let fixture: ComponentFixture<EmiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
