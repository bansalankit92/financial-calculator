import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OldVsNewIncomeTaxComponent } from './old-vs-new-income-tax.component';

describe('OldVsNewIncomeTaxComponent', () => {
  let component: OldVsNewIncomeTaxComponent;
  let fixture: ComponentFixture<OldVsNewIncomeTaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OldVsNewIncomeTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldVsNewIncomeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
