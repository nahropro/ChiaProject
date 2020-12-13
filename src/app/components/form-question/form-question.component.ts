import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
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

  constructor() { }

  ngOnInit(): void {
  }

  selectionChange(){
    this.formChange.emit();
  }
}
