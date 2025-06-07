import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncomeTaxComponent } from './income-tax.component';

describe('IncomeTaxComponent', () => {
  let component: IncomeTaxComponent;
  let fixture: ComponentFixture<IncomeTaxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
