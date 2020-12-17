import { StatisticsCount } from './../../models/statistics-count.model';
import { StatisticsQuestionGroup } from './../../models/statistics-question-group.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-question-group-view',
  templateUrl: './statistics-question-group-view.component.html',
  styleUrls: ['./statistics-question-group-view.component.scss']
})
export class StatisticsQuestionGroupViewComponent implements OnInit {
  @Input() data:StatisticsQuestionGroup;

  constructor() { }

  ngOnInit(): void {
  }

  getQuestionAnswerCount(data: StatisticsCount[],answer: string): number{
    return data?.find(d=> d.title==answer)?.count || 0;
  }
}
