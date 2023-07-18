import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientArrowComponent } from './gradient-arrow.component';

describe('GradientArrowComponent', () => {
  let component: GradientArrowComponent;
  let fixture: ComponentFixture<GradientArrowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradientArrowComponent]
    });
    fixture = TestBed.createComponent(GradientArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
