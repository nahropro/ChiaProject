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
}
