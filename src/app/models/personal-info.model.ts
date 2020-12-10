export class PersonalInfo{
    fullName: string;
    scienceRank: string;
    university: string;
    age: number;
    gender: 'نێر' | 'مێ';
    educationLevel: string;
    jobExperience: string;
    jobType: string;
    experienceType: string;

    constructor(){
        this.fullName=null;
        this.scienceRank=null;
        this.university=null;
        this.age=null;
        this.gender=null;
        this.educationLevel=null;
        this.jobExperience=null;
        this.jobType=null;
        this.experienceType=null;
    }
}