import { Injectable } from '@angular/core';
import { Style, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import * as _ from 'lodash';
import { Question } from 'src/app/models/question.model';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4 } from '../meta-data/form.meta-data';
import { suggestionGroup } from './../meta-data/form.meta-data';
import { Form } from './../models/form.model';
import { StatisticsQuestionGroup } from './../models/statistics-question-group.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private generalService: GeneralService) { }

  exportStatistics(stattisticsQuestionGroupes: StatisticsQuestionGroup[], filename: string) {
    let wb = new Workbook();
    let ws = wb.addWorksheet('sheet');
    let lastIndex:number=0;

    ws.views = [{ rightToLeft: true }];

    stattisticsQuestionGroupes.forEach((v, i) => {
      const index: number = (v.statisticsQuestions.length + 1 + 3) * i;

      //Set style for heders
      this.styleRange(ws, index + 1, 1, index + 2, 11, {
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
      this.styleRange(ws, index + 1, 1, index + 2 + v.statisticsQuestions.length, 11, {
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      });

      ws.getColumn(6).width = 60;

      ws.mergeCells(index + 1, 1, index + 1, 5);
      ws.getCell(index + 1, 1).value = 'وضعیت موجود (آنچه که الان هست)';

      ws.mergeCells(index + 1, 7, index + 1, 11);
      ws.getCell(index + 1, 7).value = 'وضعیت مطلوب (آنچه که الان باید باشد)';

      ws.getCell(index + 2, 1).value = 'خیلی زیاد';
      ws.getCell(index + 2, 2).value = 'زیاد';
      ws.getCell(index + 2, 3).value = 'متوسط';
      ws.getCell(index + 2, 4).value = 'کم';
      ws.getCell(index + 2, 5).value = 'خیلی کم';

      ws.mergeCells(index + 1, 6, index + 2, 6);
      ws.getCell(index + 1, 6).value = v.titlef;

      ws.getCell(index + 2, 7).value = 'خیلی زیاد';
      ws.getCell(index + 2, 8).value = 'زیاد';
      ws.getCell(index + 2, 9).value = 'متوسط';
      ws.getCell(index + 2, 10).value = 'کم';
      ws.getCell(index + 2, 11).value = 'خیلی کم';

      v.statisticsQuestions.forEach((qv, qi) => {
        ws.getCell(index + 3 + qi, 1).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر زۆر');
        ws.getCell(index + 3 + qi, 2).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر');
        ws.getCell(index + 3 + qi, 3).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'مامناوەند');
        ws.getCell(index + 3 + qi, 4).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'كەم');
        ws.getCell(index + 3 + qi, 5).value = this.generalService.getQuestionAnswerCount(qv.noramlAnswers, 'زۆر كەم');
        ws.getCell(index + 3 + qi, 6).value = qv.titlef;
        ws.getCell(index + 3 + qi, 7).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر زۆر');
        ws.getCell(index + 3 + qi, 8).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر');
        ws.getCell(index + 3 + qi, 9).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'مامناوەند');
        ws.getCell(index + 3 + qi, 10).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'كەم');
        ws.getCell(index + 3 + qi, 11).value = this.generalService.getQuestionAnswerCount(qv.wantedAnswers, 'زۆر كەم');

        lastIndex=index+3+qi;
      });
    });

    ws.mergeCells(lastIndex+3,1,lastIndex+3,2);
    //Set style for heders
    this.styleRange(ws, lastIndex+3, 1, lastIndex+3, 1, {
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
    ws.getCell(lastIndex+3,1).value=suggestionGroup.titlef;

    suggestionGroup.suggestions.forEach((v,i)=>{
      ws.getCell(lastIndex+3+i+1,1).value=i+1;
      ws.getCell(lastIndex+3+i+1,2).value=v.value;
    });

    this.setBorder(ws,lastIndex+3,1,lastIndex+3+suggestionGroup.suggestions.length,2);

    wb.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, filename + '.xlsx');
    });
  }

  private styleRange(ws: Worksheet, top: number, left: number, bottom: number, right: number, style: Partial<Style>) {
    for (let i = top; i <= bottom; i++) {
      for (let j = left; j <= right; j++) {
        ws.getCell(i, j).style = Object.assign(ws.getCell(i, j).style, style);
      }
    }
  }

  exportForms(forms: Form[], filename: string) {
    const formsDuplicated: Form[]=[...forms,...forms];

    let wb = new Workbook();

    this.exportFormsSheet1(wb, _.shuffle(formsDuplicated));
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
    ws.getCell(1, 1).value = 'سن'.replace(/ /g,'_');
    ws.getCell(1, 2).value = 'جنسیت'.replace(/ /g,'_');
    ws.getCell(1, 3).value = 'میزان تحصیلات'.replace(/ /g,'_');
    ws.getCell(1, 4).value = 'سابقه مدت کاري'.replace(/ /g,'_');
    ws.getCell(1, 5).value = 'موقعیت شغلی'.replace(/ /g,'_');
    ws.getCell(1, 6).value = 'رشته تخصصی'.replace(/ /g,'_');

    //Set question headers
    const questions: Question[] = [...questionGroup1.questions, ...questionGroup2.questions, ...questionGroup3.questions, ...questionGroup4.questions];
    questions.forEach((qv, qi) => {
      ws.getCell(1, 6 + (qi * 2) + 1).value = (qv.titlef + ' (موجود)').replace(/ /g,'_');
      ws.getCell(1, 6 + (qi * 2) + 1 + 1).value = (qv.titlef + ' (مطلوب)').replace(/ /g,'_');
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
    ws.getCell(1, 2).value = 1;
    ws.getCell(2, 1).value = 'زن';
    ws.getCell(2, 2).value = 2;
    this.setBorder(ws, 1, 1, 2, 2);

    //Set education level
    ws.getCell(1,4).value='دیپلم و کمتر';
    ws.getCell(1,5).value=1;
    ws.getCell(2,4).value='فوق دیپلم';
    ws.getCell(2,5).value=2;
    ws.getCell(3,4).value='لیسانس';
    ws.getCell(3,5).value=3;
    ws.getCell(4,4).value='فوق لیسانس';
    ws.getCell(4,5).value=4;
    ws.getCell(5,4).value='دکتري';
    ws.getCell(5,5).value=5;
    ws.getCell(6,4).value='استادیار';
    ws.getCell(6,5).value=6;
    ws.getCell(7,4).value='پرفسور';
    ws.getCell(7,5).value=7;
    this.setBorder(ws,1,4,7,5);

    //Set job experience
    ws.getCell(1,7).value='کمتر از 5 سال';
    ws.getCell(1,8).value=1;
    ws.getCell(2,7).value='5 تا 10 سال';
    ws.getCell(2,8).value=2;
    ws.getCell(3,7).value='10 تا 15 سال';
    ws.getCell(3,8).value=3;
    ws.getCell(4,7).value='15 تا 20 سال';
    ws.getCell(4,8).value=4;
    ws.getCell(5,7).value='20 تا 25 سال';
    ws.getCell(5,8).value=5;
    ws.getCell(6,7).value='25 سال به بالا';
    ws.getCell(6,8).value=6;
    this.setBorder(ws,1,7,6,8);

    //Set job type
    ws.getCell(1,10).value='اداري';
    ws.getCell(1,11).value=1;
    ws.getCell(2,10).value='ستادي';
    ws.getCell(2,11).value=2;
    ws.getCell(3,10).value='آموزشی';
    ws.getCell(3,11).value=3;
    ws.getCell(4,10).value='اجرایی';
    ws.getCell(4,11).value=4;
    this.setBorder(ws,1,10,4,11);

    //Set experience type
    ws.getCell(1,13).value='تربیت بدنی';
    ws.getCell(1,14).value=1;
    ws.getCell(2,13).value='سایر رشته ها';
    ws.getCell(2,14).value=2;
    this.setBorder(ws,1,13,2,14);

    //Set answer
    ws.getCell(1,16).value='خیلی کم';
    ws.getCell(1,17).value=1;
    ws.getCell(2,16).value='کم';
    ws.getCell(2,17).value=2;
    ws.getCell(3,16).value='متوسط';
    ws.getCell(3,17).value=3;
    ws.getCell(4,16).value='زیاد';
    ws.getCell(4,17).value=4;
    ws.getCell(5,16).value='خیلی زیاد';
    ws.getCell(5,17).value=5;
    this.setBorder(ws,1,16,5,17);
  }

  private setBorder(ws: Worksheet, top: number, left: number, bottom: number, right: number) {
    this.styleRange(ws, top, left, bottom, right, {
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      }
    });
  }
}
