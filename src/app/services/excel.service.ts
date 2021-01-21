import { Form } from './../models/form.model';
import { StatisticsQuestionGroup } from './../models/statistics-question-group.model';
import { Injectable } from '@angular/core';
import { Style, Workbook, Worksheet } from 'exceljs';
import { StatisticsCount } from '../models/statistics-count.model';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportStatistics(stattisticsQuestionGroupes: StatisticsQuestionGroup[], filename: string){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('sheet');

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
      worksheet.getCell(index + 1, 1).value = 'وضعیت موجود (آنچه که الان هست)';

      worksheet.mergeCells(index + 1, 7, index + 1, 11);
      worksheet.getCell(index + 1, 7).value = 'وضعیت مطلوب (آنچه که الان باید باشد)';

      worksheet.getCell(index + 2, 1).value = 'خیلی زیاد';
      worksheet.getCell(index + 2, 2).value = 'زیاد';
      worksheet.getCell(index + 2, 3).value = 'متوسط';
      worksheet.getCell(index + 2, 4).value = 'کم';
      worksheet.getCell(index + 2, 5).value = 'خیلی کم';

      worksheet.mergeCells(index + 1, 6, index + 2, 6);
      worksheet.getCell(index + 1, 6).value = v.title;

      worksheet.getCell(index + 2, 7).value = 'خیلی زیاد';
      worksheet.getCell(index + 2, 8).value = 'زیاد';
      worksheet.getCell(index + 2, 9).value = 'متوسط';
      worksheet.getCell(index + 2, 10).value = 'کم';
      worksheet.getCell(index + 2, 11).value = 'خیلی کم';

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
      fs.saveAs(blob, filename+'.xlsx');
    })
  }

  private getQuestionAnswerCount(data: StatisticsCount[], answer: string): number {
    return data?.find(d => d.title == answer)?.count || 0;
  }

  private excelStyleRange(ws: Worksheet, top: number, left: number, bottom: number, right: number, style: Partial<Style>) {
    for (let i = top; i <= bottom; i++) {
      for (let j = left; j <= right; j++) {
        ws.getCell(i, j).style = Object.assign(ws.getCell(i, j).style,style);
      }
    }
  }

  exportForms(forms: Form[], filename: string){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('sheet');

    worksheet.views = [{ rightToLeft: true }];

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, filename+'.xlsx');
    })
  }
}
