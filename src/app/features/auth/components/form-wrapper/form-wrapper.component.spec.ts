import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWrapperComponent } from './form-wrapper.component';

describe('FormWrapperComponent', () => {
  let component: FormWrapperComponent;
  let fixture: ComponentFixture<FormWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormWrapperComponent]
    });
    fixture = TestBed.createComponent(FormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
