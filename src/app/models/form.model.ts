import { PersonalInfo } from './personal-info.model';
import { QuestionGroup } from './question-group.model';

export class Form{
    id: string;
    personalInfo: PersonalInfo;
    questionGroup1: QuestionGroup;
    questionGroup2: QuestionGroup;
    questionGroup3: QuestionGroup;
    questionGroup4: QuestionGroup;

    constructor(){
        this.personalInfo=new PersonalInfo();
    }
}