import { KeyValue } from "@angular/common";

export class SuggestionGroup{
    id: number;
    titlef: string;
    suggestions: KeyValue<number,string>[];
}