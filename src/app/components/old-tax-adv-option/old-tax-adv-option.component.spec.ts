import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldTaxAdvOptionComponent } from './old-tax-adv-option.component';

describe('OldTaxAdvOptionComponent', () => {
  let component: OldTaxAdvOptionComponent;
  let fixture: ComponentFixture<OldTaxAdvOptionComponent>;

  beforeEach(async(() => {
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
