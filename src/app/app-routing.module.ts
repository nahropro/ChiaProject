import { AuthGuardService } from './services/auth-guard.service';
import { FillFormComponent } from './components/fill-form/fill-form.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},

  {path: 'login', component: LoginComponent},

  {path: 'form', component: ListFormComponent, canActivate: [AuthGuardService]},
  {path: 'form/create', component: CreateFormComponent, canActivate: [AuthGuardService]},
  {path: 'form/update/:id', component: UpdateFormComponent, canActivate: [AuthGuardService]},
  {path: 'form/fill', component: FillFormComponent},

  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }