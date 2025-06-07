import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InlineEditInputComponent } from './inline-edit-input.component';

describe('InlineEditInputComponent', () => {
  let component: InlineEditInputComponent;
  let fixture: ComponentFixture<InlineEditInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineEditInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
