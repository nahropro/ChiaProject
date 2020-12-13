import { PersonalInfo } from './../../models/personal-info.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-personal-info',
  templateUrl: './form-personal-info.component.html',
  styleUrls: ['./form-personal-info.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class FormPersonalInfoComponent implements OnInit {
  @Input() data: PersonalInfo=new PersonalInfo();
  @Input() fillFormMode:boolean;
  @Output() formChange:EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
