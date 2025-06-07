import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OldIncomeTaxComponent } from './old-income-tax.component';

describe('OldIncomeTaxComponent', () => {
  let component: OldIncomeTaxComponent;
  let fixture: ComponentFixture<OldIncomeTaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OldIncomeTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldIncomeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
