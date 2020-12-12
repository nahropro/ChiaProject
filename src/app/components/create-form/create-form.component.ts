import { PersonalInfo } from './../../models/personal-info.model';
import { Form } from 'src/app/models/form.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormServiceService } from './../../services/form-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  @Input() data: PersonalInfo=new PersonalInfo();
  id: string;
  editMode:boolean=false;
  
  constructor(private formService: FormServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');

    if(this.id){
      this.formService.get(this.id).pipe(take(1)).subscribe(f=> {
        const form: Form=f;

        this.data=_.merge(new PersonalInfo(),form.personalInfo);

        this.editMode=true;
      });
    }
  }

  update(){
    const form: Form={
        personalInfo: {...this.data}
      } as Form;

    if(this.editMode){
      this.formService.update(this.id,form)
        .then(d=>{
          this.router.navigateByUrl("/form");
        });
    }
    else {
      this.formService.create(this.data)
      .then(d=>{
        this.router.navigateByUrl("/form");
      });
    }
  }
}
