import { Form } from 'src/app/models/form.model';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4, questionGroupTest } from './../../meta-data/form.meta-data';
import { Component, OnInit } from '@angular/core';
import { QuestionGroup } from 'src/app/models/question-group.model';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  data: Form=new Form();

  constructor() { 
    this.data.questionGroup1=questionGroup1;
    this.data.questionGroup2=questionGroup2;
    this.data.questionGroup3=questionGroup3;
    this.data.questionGroup4=questionGroup4;
  }

  ngOnInit(): void {
  }

  fillForm(valid: boolean){
    console.log(valid,this.data);
  }
}
