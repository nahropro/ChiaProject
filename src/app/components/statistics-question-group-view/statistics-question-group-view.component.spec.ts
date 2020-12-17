import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsQuestionGroupViewComponent } from './statistics-question-group-view.component';

describe('StatisticsQuestionGroupViewComponent', () => {
  let component: StatisticsQuestionGroupViewComponent;
  let fixture: ComponentFixture<StatisticsQuestionGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsQuestionGroupViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsQuestionGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
