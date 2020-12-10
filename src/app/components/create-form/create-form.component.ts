import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalInfo } from 'src/app/models/personal-info.model';
import { FormServiceService } from './../../services/form-service.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  @Input() data: PersonalInfo=new PersonalInfo();
  
  constructor(private formService: FormServiceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(){
    this.formService.create(this.data)
    .then(d=>{
      this.router.navigateByUrl("/form");
    });;
  }
}
