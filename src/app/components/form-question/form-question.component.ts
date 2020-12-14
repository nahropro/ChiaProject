import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { UUID } from 'angular2-uuid';
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
  randomName1: string=UUID.UUID();
  randomName2: string=UUID.UUID();

  constructor() { }

  ngOnInit(): void {
    
  }

  selectionChange(){
    this.formChange.emit();
  }
}
