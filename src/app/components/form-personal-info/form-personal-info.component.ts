import { PersonalInfo } from './../../models/personal-info.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-personal-info',
  templateUrl: './form-personal-info.component.html',
  styleUrls: ['./form-personal-info.component.scss']
})
export class FormPersonalInfoComponent implements OnInit {
  @Input() data: PersonalInfo=new PersonalInfo();

  constructor() { }

  ngOnInit(): void {
  }

}
