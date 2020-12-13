import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionGroupComponent } from './form-question-group.component';

describe('FormQuestionGroupComponent', () => {
  let component: FormQuestionGroupComponent;
  let fixture: ComponentFixture<FormQuestionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQuestionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
