import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupViewComponent } from './question-group-view.component';

describe('QuestionGroupViewComponent', () => {
  let component: QuestionGroupViewComponent;
  let fixture: ComponentFixture<QuestionGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionGroupViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
