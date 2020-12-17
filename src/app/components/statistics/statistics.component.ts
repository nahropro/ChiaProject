import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from 'src/app/models/form.model';
import { Question } from 'src/app/models/question.model';
import { FormServiceService } from 'src/app/services/form-service.service';
import { StatisticsCount } from './../../models/statistics-count.model';
import { StatisticsQuestionGroup } from './../../models/statistics-question-group.model';
import { StatisticsQuestion } from './../../models/statistics-question.model';
import { Column, Workbook, WorkbookView } from 'exceljs';
import * as fs from 'file-saver';

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

  title = 'excelJs Example in Angular';


  data: product[] = [
    { id: 1, name: "Nivia Graffiti Basketball", brand: "Nivia", color: "Mixed", price: 391.00 },
    { id: 2, name: "Strauss Official Basketball", brand: "Strauss", color: "Orange", price: 391.00 },
    { id: 3, name: "Spalding Rebound Rubber Basketball", brand: "Spalding", color: "Brick", price: 675.00 },
    { id: 4, name: "Cosco Funtime Basket Ball, Size 6 ", brand: "Cosco", color: "Orange", price: 300.00 },
    { id: 5, name: "Nike Dominate 8P Basketball", brand: "Nike", color: "brick", price: 1295 },
    { id: 6, name: "Nivia Europa Basketball", brand: "Nivia", color: "Orange", price: 280.00 }
  ]

  constructor(private formService: FormServiceService) { }

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
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('sheet');

    worksheet.views=[{rightToLeft:true}];

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Brand', key: 'brand', width: 10 },
      { header: 'Color', key: 'color', width: 10 },
      { header: 'Price', key: 'price', width: 10, style: { font: { name: 'Arial Black', size: 10 } } },
    ] as Column[];

    this.data.forEach(e => {
      worksheet.addRow({ id: e.id, name: e.name, brand: e.brand, color: e.color, price: e.price }, "n");
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })
  }

  exportToWord() {
    console.log('Exporting to word...')
  }
}


export interface product {
  id: number
  name: string
  brand: string
  color: string
  price: number
}