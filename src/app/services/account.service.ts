import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private db: AngularFirestore) { }

  userIsAdmin(id: string): Promise<boolean>{
    return this.db.collection('users').doc(id).get().pipe(take(1)).toPromise().then(d=> {
      return d.data()['isAdmin']===true;
    }).catch(err=> {
      return false;
    });
  }
}
