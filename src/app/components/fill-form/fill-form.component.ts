import { FormServiceService } from './../../services/form-service.service';
import { Form } from 'src/app/models/form.model';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4, questionGroupTest } from './../../meta-data/form.meta-data';
import { Component, OnInit } from '@angular/core';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.scss']
})
export class FillFormComponent implements OnInit {
  data: Form;
  id: string;

  constructor(private formService: FormServiceService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');

    this.formService.get(this.id).pipe(take(1)).subscribe(d=> this.data=d);
  }

  fillForm(valid: boolean){
    console.log(valid,this.data);
  }
}
