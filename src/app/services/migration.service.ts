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
}
