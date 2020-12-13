import { PersonalInfo } from './../../models/personal-info.model';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
