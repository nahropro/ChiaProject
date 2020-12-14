import { Component, Input, OnInit } from '@angular/core';
import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-question-group-view',
  templateUrl: './question-group-view.component.html',
  styleUrls: ['./question-group-view.component.scss']
})
export class QuestionGroupViewComponent implements OnInit {
  @Input() data: QuestionGroup=new QuestionGroup();
  displayedColumns: string[] = ['normalAnswer', 'title', 'wantedAnswer',];

  constructor() { }

  ngOnInit(): void {
  }

}
