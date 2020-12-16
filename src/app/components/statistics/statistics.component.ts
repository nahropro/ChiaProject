import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from 'src/app/models/form.model';
import { FormServiceService } from 'src/app/services/form-service.service';
import * as _ from 'lodash';
import { QuestionGroup } from 'src/app/models/question-group.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  formSubscription: Subscription;
  forms: Form[];
  result:any;

  constructor(private formService: FormServiceService) { }

  ngOnInit(): void {
    this.formSubscription = this.formService.getAll().subscribe(f=> {
      this.forms=f;
      this.generateStatistics();
      // console.log(this.forms);
    });
  }

  generateStatistics(){
    var questions1=([] as Question[]).concat(...this.forms.map(f=> f.questionGroup1).map(f=> f.questions));
    // console.log(questions1);

    const r=_.groupBy(_.groupBy(questions1, f=> f.id),d=> d['wantedAnswer']);

    // const r2=_.groupBy(r, d=> d['questions'].id);

    console.log(r);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
