import { StatisticsCount } from './statistics-count.model';
export class StatisticsQuestion{
    id: number;
    title: string;
    titlef: string;
    noramlAnswers: StatisticsCount[];
    wantedAnswers: StatisticsCount[];
}