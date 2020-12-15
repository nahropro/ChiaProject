import { StatisticsCount } from './statistics-count.model';
export class StatisticsQuestion{
    id: number;
    title: string;
    noramlAnswer: StatisticsCount[];
    wantedAnswer: StatisticsCount[];
}