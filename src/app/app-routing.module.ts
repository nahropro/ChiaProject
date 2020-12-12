import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { FillFormComponent } from './components/fill-form/fill-form.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/form', pathMatch:'full'},

  {path: 'login', component: LoginComponent},

  {path: 'form/update/:id', component: CreateFormComponent, canActivate: [AuthGuardService]},
  {path: 'form/create', component: CreateFormComponent, canActivate: [AuthGuardService]},
  {path: 'form/fill/:id', component: FillFormComponent},
  {path: 'form', component: ListFormComponent, canActivate: [AuthGuardService]},

  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }