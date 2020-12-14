import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FormQuestionComponent implements OnInit {
  @Input() data: Question;
  @Output() formChange:EventEmitter<null> = new EventEmitter()
  randomName1: string=Math.random().toString();
  randomName2: string=Math.random().toString();

  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(){
    this.formChange.emit();
  }
}
