import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Form } from './../models/form.model';
import { PersonalInfo } from './../models/personal-info.model';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';
import { questionGroup1, questionGroup2, questionGroup3, questionGroup4 } from '../meta-data/form.meta-data';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private db: AngularFirestore) { }

  create(personalInfo: PersonalInfo){
    // let form: Form={
    //   personalInfo:{...personalInfo}
    // } as Form;
    const form:Form=new Form();

    form.personalInfo=personalInfo;
    form.filled=false;
    form.questionGroup1=questionGroup1;
    form.questionGroup2=questionGroup2;
    form.questionGroup3=questionGroup3;
    form.questionGroup4=questionGroup4;

    return this.db.collection('forms').add(JSON.parse(JSON.stringify(form)));
  }

  getAll():Observable<Form[]>{
    return this.db.collection('forms').snapshotChanges().pipe(map(d=> d.map(f=> {
      return {
        id: f.payload.doc.id,
        ...f.payload.doc.data() as Object
      } as Form
    })))
  }

  get(id: string) : Observable<Form>{
    return this.db.collection('forms').doc(id).valueChanges() as Observable<Form>;
  }

  update(id: string, form: Form){
    return this.db.collection('forms').doc(id).update(form);
  }

  delete(id: string){
    return this.db.collection('forms').doc(id).delete();
  }
}
