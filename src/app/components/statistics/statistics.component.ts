import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Form } from 'src/app/models/form.model';
import { Question } from 'src/app/models/question.model';
import { FormServiceService } from 'src/app/services/form-service.service';
import { StatisticsCount } from './../../models/statistics-count.model';
import { StatisticsQuestionGroup } from './../../models/statistics-question-group.model';
import { StatisticsQuestion } from './../../models/statistics-question.model';
import { Column, Style, Workbook, WorkbookView, Worksheet } from 'exceljs';
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

    const stattisticsQuestionGroupes: StatisticsQuestionGroup[] = [
      this.statisticQuestionGroup1,
      this.statisticQuestionGroup2,
      this.statisticQuestionGroup3,
      this.statisticQuestionGroup4
    ]

    worksheet.views = [{ rightToLeft: true }];

    stattisticsQuestionGroupes.forEach((v, i) => {
      const index: number = (v.statisticsQuestions.length + 1 + 3) * i;

      //Set style for heders
      this.excelStyleRange(worksheet, index + 1, 1, index + 2, 11, {
        font: { bold: true },
        alignment: {
          vertical: 'middle',
          horizontal: 'center'
        },
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '95B3D7' }
        }
      });

      //set border for question groups
      this.excelStyleRange(worksheet,index+1,1,index+2+v.statisticsQuestions.length,11,{
        border:{
          top:{style:'thin'},
          left:{style:'thin'},
          bottom:{style:'thin'},
          right:{style:'thin'},
        }
      });

      worksheet.mergeCells(index + 1, 1, index + 1, 5);
      worksheet.getCell(index + 1, 1).value = 'دۆخی ئارایی (ئەوەی كە ئێستا هەیە)';

      worksheet.mergeCells(index + 1, 7, index + 1, 11);
      worksheet.getCell(index + 1, 7).value = 'دۆخی خوازراو (ئەوەی كە ئێستا دەبێت هەبێت)';

      worksheet.getCell(index + 2, 1).value = 'زۆر زۆر';
      worksheet.getCell(index + 2, 2).value = 'زۆر';
      worksheet.getCell(index + 2, 3).value = 'مامناوەند';
      worksheet.getCell(index + 2, 4).value = 'كەم';
      worksheet.getCell(index + 2, 5).value = 'زۆر كەم';

      worksheet.mergeCells(index + 1, 6, index + 2, 6);
      worksheet.getCell(index + 1, 6).value = v.title;

      worksheet.getCell(index + 2, 7).value = 'زۆر زۆر';
      worksheet.getCell(index + 2, 8).value = 'زۆر';
      worksheet.getCell(index + 2, 9).value = 'مامناوەند';
      worksheet.getCell(index + 2, 10).value = 'كەم';
      worksheet.getCell(index + 2, 11).value = 'زۆر كەم';

      v.statisticsQuestions.forEach((qv, qi) => {
        worksheet.getCell(index + 3 + qi, 1).value = this.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر زۆر');
        worksheet.getCell(index + 3 + qi, 2).value = this.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر');
        worksheet.getCell(index + 3 + qi, 3).value = this.getQuestionAnswerCount(qv.noramlAnswers, 'مامناوەند');
        worksheet.getCell(index + 3 + qi, 4).value = this.getQuestionAnswerCount(qv.noramlAnswers, 'كەم');
        worksheet.getCell(index + 3 + qi, 5).value = this.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر كەم');
        worksheet.getCell(index + 3 + qi, 6).value = qv.title;
        worksheet.getCell(index + 3 + qi, 7).value = this.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر زۆر');
        worksheet.getCell(index + 3 + qi, 8).value = this.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر');
        worksheet.getCell(index + 3 + qi, 9).value = this.getQuestionAnswerCount(qv.wantedAnswers, 'مامناوەند');
        worksheet.getCell(index + 3 + qi, 10).value = this.getQuestionAnswerCount(qv.wantedAnswers, 'كەم');
        worksheet.getCell(index + 3 + qi, 11).value = this.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر كەم');
      });
    });

    worksheet.getColumn(6).width = 60;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ProductData.xlsx');
    })
  }

  excelStyleRange(ws: Worksheet, top: number, left: number, bottom: number, right: number, style: Partial<Style>) {
    for (let i = top; i <= bottom; i++) {
      for (let j = left; j <= right; j++) {
        ws.getCell(i, j).style = Object.assign(ws.getCell(i, j).style,style);
      }
    }
  }

  exportToWord() {
    console.log('Exporting to word...')
  }

  getQuestionAnswerCount(data: StatisticsCount[], answer: string): number {
    return data?.find(d => d.title == answer)?.count || 0;
  }
}