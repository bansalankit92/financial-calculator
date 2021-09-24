import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PpfComponent } from './ppf.component';

describe('PpfComponent', () => {
  let component: PpfComponent;
  let fixture: ComponentFixture<PpfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
