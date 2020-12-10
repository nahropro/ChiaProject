import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string='';
  password:string='';
  loginFiled: boolean;
  returnUrl: string;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/form';
  }



  login(): void{
    this.loginFiled=false;

    this.auth.login(this.email,this.password)
      .then(()=> this.router.navigateByUrl(this.returnUrl))
      .catch(err=> this.loginFiled=true);
  }
}
