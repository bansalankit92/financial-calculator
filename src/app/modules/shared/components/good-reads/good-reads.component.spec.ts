import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoodReadsComponent } from './good-reads.component';

describe('GoodReadsComponent', () => {
  let component: GoodReadsComponent;
  let fixture: ComponentFixture<GoodReadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodReadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodReadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
