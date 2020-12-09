import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

  login (email: string, password: string): Promise<firebase.default.auth.UserCredential>{
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      this.router.navigateByUrl('/login');
    });
  }

  get user$():Observable<firebase.default.User>{
    return this.afAuth.authState;
  }
}
