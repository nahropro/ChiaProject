import { GeneralService } from './general.service';
import { Question } from 'src/app/models/question.model';
import { Form } from './../models/form.model';
import { StatisticsQuestionGroup } from './../models/statistics-question-group.model';
import { Injectable } from '@angular/core';
import { Style, Workbook, Worksheet } from 'exceljs';
import { StatisticsCount } from '../models/statistics-count.model';
import * as fs from 'file-saver';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4 } from '../meta-data/form.meta-data';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private generalService: GeneralService) { }

  exportStatistics(stattisticsQuestionGroupes: StatisticsQuestionGroup[], filename: string) {
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
      this.excelStyleRange(worksheet, index + 1, 1, index + 2 + v.statisticsQuestions.length, 11, {
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
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
      worksheet.getCell(index + 1, 6).value = v.titlef;

      worksheet.getCell(index + 2, 7).value = 'خیلی زیاد';
      worksheet.getCell(index + 2, 8).value = 'زیاد';
      worksheet.getCell(index + 2, 9).value = 'متوسط';
      worksheet.getCell(index + 2, 10).value = 'کم';
      worksheet.getCell(index + 2, 11).value = 'خیلی کم';

      v.statisticsQuestions.forEach((qv, qi) => {
        worksheet.getCell(index + 3 + qi, 1).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر زۆر');
        worksheet.getCell(index + 3 + qi, 2).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر');
        worksheet.getCell(index + 3 + qi, 3).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'مامناوەند');
        worksheet.getCell(index + 3 + qi, 4).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'كەم');
        worksheet.getCell(index + 3 + qi, 5).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر كەم');
        worksheet.getCell(index + 3 + qi, 6).value = qv.titlef;
        worksheet.getCell(index + 3 + qi, 7).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر زۆر');
        worksheet.getCell(index + 3 + qi, 8).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر');
        worksheet.getCell(index + 3 + qi, 9).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'مامناوەند');
        worksheet.getCell(index + 3 + qi, 10).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'كەم');
        worksheet.getCell(index + 3 + qi, 11).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر كەم');
      });
    });

    worksheet.getColumn(6).width = 60;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, filename + '.xlsx');
    });
  }

  private excelStyleRange(ws: Worksheet, top: number, left: number, bottom: number, right: number, style: Partial<Style>) {
    for (let i = top; i <= bottom; i++) {
      for (let j = left; j <= right; j++) {
        ws.getCell(i, j).style = Object.assign(ws.getCell(i, j).style, style);
      }
    }
  }

  exportForms(forms: Form[], filename: string) {
    let wb = new Workbook();

    this.exportFormsSheet1(wb, forms);
    this.exportFormsSheet2(wb);

    wb.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, filename + '.xlsx');
    })
  }

  private exportFormsSheet1(wb: Workbook, forms: Form[]) {
    let ws = wb.addWorksheet('sheet1');

    ws.views = [{ rightToLeft: true }];

    //Set headers
    //Set personal info headers
    ws.getCell(1, 1).value = 'سن';
    ws.getCell(1, 2).value = 'جنسیت';
    ws.getCell(1, 3).value = 'میزان تحصیلات';
    ws.getCell(1, 4).value = 'سابقه مدت کاري';
    ws.getCell(1, 5).value = 'موقعیت شغلی';
    ws.getCell(1, 6).value = 'رشته تخصصی';

    //Set question headers
    const questions: Question[] = [...questionGroup1.questions, ...questionGroup2.questions, ...questionGroup3.questions, ...questionGroup4.questions];
    questions.forEach((qv, qi) => {
      ws.getCell(1, 6 + (qi * 2) + 1).value = qv.titlef + ' (موجود)';
      ws.getCell(1, 6 + (qi * 2) + 1 + 1).value = qv.titlef + ' (مطلوب)';
    })

    forms.forEach((v, i) => {
      //Set personal info data
      ws.getCell(i + 1 + 1, 1).value = v.personalInfo.age;
      ws.getCell(i + 1 + 1, 2).value = v.personalInfo.gender === 'نێر' ? 1 : 2;
      ws.getCell(i + 1 + 1, 3).value = this.generalService.getNumericalValueOfEducationLevel(v.personalInfo.educationLevel);
      ws.getCell(i + 1 + 1, 4).value = this.generalService.getNumericalValueOfJobExperience(v.personalInfo.jobExperience);
      ws.getCell(i + 1 + 1, 5).value = this.generalService.getNumericalValueOfJobType(v.personalInfo.jobType);
      ws.getCell(i + 1 + 1, 6).value = this.generalService.getNumericalValueOfExperienceType(v.personalInfo.experienceType);

      //Set question result
      const questions: Question[] = [...v.questionGroup1.questions, ...v.questionGroup2.questions, ...v.questionGroup3.questions, ...v.questionGroup4.questions];

      questions.forEach((qv, qi) => {
        ws.getCell(i + 1 + 1, 6 + (qi * 2) + 1).value = this.generalService.getNumericalValueOfAnswer(qv.normalAnswer);
        ws.getCell(i + 1 + 1, 6 + (qi * 2) + 1 + 1).value = this.generalService.getNumericalValueOfAnswer(qv.wantedAnswer);
      })
    });
  }

  private exportFormsSheet2(wb: Workbook) {
    let ws = wb.addWorksheet('sheet2');

    ws.views = [{ rightToLeft: true }];

    //Set gender
    ws.getCell(1, 1).value = 'مرد';
    ws.getCell(1, 2).value = '1';
    ws.getCell(2, 1).value = 'زن';
    ws.getCell(2, 2).value = '2';
    this.setBorder(ws,1,1,2,2);
  }

  private setBorder(ws: Worksheet, top: number, left: number, bottom: number, right: number) {
    for (let i = top; i <= bottom; i++) {
      for (let j = left; j <= right; j++) {
        ws.getCell(i, j).style = Object.assign(ws.getCell(i, j).style, {
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          }
        });
      }
    }
  }
}
