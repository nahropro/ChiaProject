import { PersonalInfo } from './personal-info.model';

export class Form{
    personalInfo: PersonalInfo;

    constructor(){
        this.personalInfo=new PersonalInfo();
    }
}