import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { FillFormComponent } from './components/fill-form/fill-form.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatrialsModule } from './modules/matrials-module';
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';
import { FormServiceService } from './services/form-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateFormComponent,
    ListFormComponent,
    FillFormComponent,
    NavBarComponent,
    YesNoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatrialsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule
  ],
  providers: [
    AuthService,
    FormServiceService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
