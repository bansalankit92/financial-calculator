import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OldTaxAdvOptionComponent } from './old-tax-adv-option.component';

describe('OldTaxAdvOptionComponent', () => {
  let component: OldTaxAdvOptionComponent;
  let fixture: ComponentFixture<OldTaxAdvOptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OldTaxAdvOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldTaxAdvOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
