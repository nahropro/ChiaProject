import { Injectable } from '@angular/core';
import { StatisticsCount } from '../models/statistics-count.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  public getQuestionAnswerCount(data: StatisticsCount[], answer: string): number {
    return data?.find(d => d.title == answer)?.count || 0;
  }

  getNumericalValueOfAnswer(answer: string): number {
    switch (answer.trim()) {
      case 'زۆر كەم':
        return 1;
      case 'كەم':
        return 2;
      case 'مامناوەند':
        return 3;
      case 'زۆر':
        return 4;
      case 'زۆر زۆر':
        return 5;
      default:
        return 1;
    }
  }

  getNumericalValueOfEducationLevel(educationLevel: string): number {
    switch (educationLevel.trim()) {
      case 'دیپلۆم یان كەمتر':
        return 1;
      case 'دیپلۆمی باڵا':
        return 2;
      case 'بەكالۆریۆس':
        return 3;
      case 'ماستەر':
        return 4;
      case 'دوكتۆرا':
        return 5;
      case 'یاریدەدەری پرۆفیسۆر':
        return 6;
      case 'پرۆفیسۆر':
        return 7;
    }
  }

  getNumericalValueOfJobExperience(jobExperience: string): number {
    switch (jobExperience.trim()) {
      case 'كەمتر لە 5 ساڵ':
        return 1;
      case '5 - 10 ساڵ':
        return 2;
      case '10 - 15 ساڵ':
        return 3;
      case '15 - 20 ساڵ':
        return 4;
      case '20 - 25 ساڵ':
        return 5;
      case '25 ساڵ سەرووتر':
        return 6;
    }
  }

  getNumericalValueOfJobType(jobType: string): number {
    switch (jobType.trim()) {
      case 'ئیداری':
        return 1;
      case 'بارەگا (دەزگا)یی':
        return 2;
      case 'فێركاری':
        return 3;
      case 'جێبەجێكاری':
        return 4;
    }
  }

  getNumericalValueOfExperienceType(experienceType: string): number {
    switch (experienceType.trim()) {
      case 'پەروەردەی وەرزش':
        return 1;
      case 'بەشەكانی دیكە':
        return 2;
    }
  }
}
