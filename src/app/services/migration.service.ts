import { QuestionGroup } from 'src/app/models/question-group.model';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4 } from './../meta-data/form.meta-data';
import { take } from 'rxjs/operators';
import { Form } from './../models/form.model';
import { FormServiceService } from './form-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {

  constructor(private formService: FormServiceService) { }

  public async migrations() {
    await this.migrationV1();
    await this.migrationV2();
  }

  private async migrationV1() {
    console.log('Migrate to v1 begen...');

    const forms: Form[] = await this.formService.getAll().pipe(take(1)).toPromise();
    
    forms.forEach(async f=> {
      f.questionGroup4.title='بژاردە پەیوەستەکان بە کۆسپەکانی بەردەم فوتساڵ لە شاری کەلار.';

      const id=f.id;
      delete f.id;

      await this.formService.update(id,f);
    });

    console.log('Migrate to v1 completed.')
  }

  private async migrationV2() {
    console.log('Migrate to v2 begen...');

    const forms: Form[] = await this.formService.getAll().pipe(take(1)).toPromise();
    
    forms.forEach(async f=> {
      //set title for question groups
      f.questionGroup1.title=questionGroup1.title;
      f.questionGroup1.titlef=questionGroup1.titlef;
      f.questionGroup2.title=questionGroup2.title;
      f.questionGroup2.titlef=questionGroup2.titlef;
      f.questionGroup3.title=questionGroup3.title;
      f.questionGroup3.titlef=questionGroup3.titlef;
      f.questionGroup4.title=questionGroup4.title;
      f.questionGroup4.titlef=questionGroup4.titlef;

      //Update question title for question groups
      this.updateQuestionTitles(f.questionGroup1,questionGroup1);
      this.updateQuestionTitles(f.questionGroup2,questionGroup2);
      this.updateQuestionTitles(f.questionGroup3,questionGroup3);
      this.updateQuestionTitles(f.questionGroup4,questionGroup4);

      const id=f.id;
      delete f.id;

      await this.formService.update(id,f);
    });

    console.log('Migrate to v2 completed.')
  }

  private updateQuestionTitles(data: QuestionGroup, source: QuestionGroup){
    data.questions.forEach(q=> {
      q.title=source.questions.find(f=> f.id==q.id).title;
      q.titlef=source.questions.find(f=> f.id==q.id).titlef;
    })
  }
}
