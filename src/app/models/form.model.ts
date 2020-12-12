import { PersonalInfo } from './personal-info.model';

export class Form{
    id: string;
    personalInfo: PersonalInfo;

    constructor(){
        this.personalInfo=new PersonalInfo();
    }
}