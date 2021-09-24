import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LumpsumComponent } from './lumpsum.component';

describe('LumpsumComponent', () => {
  let component: LumpsumComponent;
  let fixture: ComponentFixture<LumpsumComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LumpsumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LumpsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
