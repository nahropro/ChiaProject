import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Form } from './../models/form.model';
import { PersonalInfo } from './../models/personal-info.model';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private db: AngularFirestore) { }

  create(personalInfo: PersonalInfo){
    let form: Form={
      personalInfo:{...personalInfo}
    }

    return this.db.collection('forms').add(Object.assign({},form));
  }
}
