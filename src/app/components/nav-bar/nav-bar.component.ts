import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser: firebase.default.User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=> this.currentUser=user);
  }

  logout(){
    this.auth.logout();
  }
}
