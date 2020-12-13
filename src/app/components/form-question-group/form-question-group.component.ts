import { Component, Input, OnInit } from '@angular/core';
import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-form-question-group',
  templateUrl: './form-question-group.component.html',
  styleUrls: ['./form-question-group.component.scss']
})
export class FormQuestionGroupComponent implements OnInit {
  @Input() data: QuestionGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
