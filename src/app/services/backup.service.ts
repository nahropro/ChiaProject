import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Form } from '../models/form.model';
import { FormServiceService } from './form-service.service';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(private formService: FormServiceService) { }

  async saveBackup(fileName: string){
    const forms: Form[]= await this.formService.getAll().pipe(take(1)).toPromise();

    const formsJson: string=JSON.stringify(forms);

    const blob = new Blob([formsJson], {type : 'application/json'});
    fs.saveAs(blob, fileName + Date.now().toString() + '.json');
  }
}
