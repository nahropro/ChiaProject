import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string='';
  password:string='';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(): void{
    this.auth.login(this.email,this.password).then(d=> console.log(d));
  }
}
