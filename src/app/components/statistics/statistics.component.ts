import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from 'src/app/models/form.model';
import { Question } from 'src/app/models/question.model';
import { FormServiceService } from 'src/app/services/form-service.service';
import { StatisticsCount } from './../../models/statistics-count.model';
import { StatisticsQuestionGroup } from './../../models/statistics-question-group.model';
import { StatisticsQuestion } from './../../models/statistics-question.model';
import { DocService } from './../../services/doc.service';
import { ExcelService } from './../../services/excel.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  formSubscription: Subscription;
  forms: Form[];
  statisticQuestionGroup1: StatisticsQuestionGroup;
  statisticQuestionGroup2: StatisticsQuestionGroup;
  statisticQuestionGroup3: StatisticsQuestionGroup;
  statisticQuestionGroup4: StatisticsQuestionGroup;

  constructor(private formService: FormServiceService,
    private excelService: ExcelService,
    private docService: DocService) { }

  ngOnInit(): void {
    this.formSubscription = this.formService.getAll().subscribe(f => {
      this.forms = f.filter(f => f.filled == true);
      this.generateStatistics();
    });
  }

  private groupArrayOfObjects(list, key) {
    const r = list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, []) as [];

    return r;
  };

  private myMap(d) {
    let r: StatisticsCount[] = [];

    Object.keys(d).forEach(k => {
      r.push({ title: k, count: (d[k] as []).length })
    });

    return r;
  }

  private generateStatisticQuestionGroup(questions: Question[], title: string): StatisticsQuestionGroup {
    let groupedQuestions = this.groupArrayOfObjects(questions, 'id');
    groupedQuestions = groupedQuestions.slice(1, groupedQuestions.length) as [];

    const statisticQuestions: StatisticsQuestion[] = groupedQuestions.map(d => {
      return {
        id: d[0]['id'],
        title: d[0]['title'] || '',
        noramlAnswers: this.myMap(this.groupArrayOfObjects(d, 'normalAnswer')),
        wantedAnswers: this.myMap(this.groupArrayOfObjects(d, 'wantedAnswer'))
      }
    });

    return {
      title: title,
      statisticsQuestions: statisticQuestions
    }
  }

  generateStatistics() {
    const questions1: Question[] = ([] as Question[]).concat(...this.forms.map(f => f.questionGroup1).map(f => f.questions));
    const questions2: Question[] = ([] as Question[]).concat(...this.forms.map(f => f.questionGroup2).map(f => f.questions));
    const questions3: Question[] = ([] as Question[]).concat(...this.forms.map(f => f.questionGroup3).map(f => f.questions));
    const questions4: Question[] = ([] as Question[]).concat(...this.forms.map(f => f.questionGroup4).map(f => f.questions));

    this.statisticQuestionGroup1 = this.generateStatisticQuestionGroup(questions1, this.forms[0]?.questionGroup1.title);
    this.statisticQuestionGroup2 = this.generateStatisticQuestionGroup(questions2, this.forms[0]?.questionGroup2.title);
    this.statisticQuestionGroup3 = this.generateStatisticQuestionGroup(questions3, this.forms[0]?.questionGroup3.title);
    this.statisticQuestionGroup4 = this.generateStatisticQuestionGroup(questions4, this.forms[0]?.questionGroup4.title);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  exportToExcel() {
    const stattisticsQuestionGroupes: StatisticsQuestionGroup[] = [
      this.statisticQuestionGroup1,
      this.statisticQuestionGroup2,
      this.statisticQuestionGroup3,
      this.statisticQuestionGroup4
    ];

    this.excelService.exportStatistics(stattisticsQuestionGroupes, 'ئەنجام');
  }

  exportToWord() {
    const stattisticsQuestionGroupes: StatisticsQuestionGroup[] = [
      this.statisticQuestionGroup1,
      this.statisticQuestionGroup2,
      this.statisticQuestionGroup3,
      this.statisticQuestionGroup4
    ];

    this.docService.exportStatistics(stattisticsQuestionGroupes, 'ئەنجام');
  }
}