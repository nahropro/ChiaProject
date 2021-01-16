import { MigrationService } from './services/migration.service';
import { DocService } from './services/doc.service';
import { ExcelService } from './services/excel.service';
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
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormQuestionGroupComponent } from './components/form-question-group/form-question-group.component';
import { FormQuestionComponent } from './components/form-question/form-question.component';
import { FormPersonalInfoComponent } from './components/form-personal-info/form-personal-info.component';
import { FormViewComponent } from './components/form-view/form-view.component';
import { QuestionGroupViewComponent } from './components/question-group-view/question-group-view.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { StatisticsQuestionGroupViewComponent } from './components/statistics-question-group-view/statistics-question-group-view.component';
import { MigrationComponent } from './components/migration/migration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateFormComponent,
    ListFormComponent,
    FillFormComponent,
    NavBarComponent,
    YesNoDialogComponent,
    FormQuestionGroupComponent,
    FormQuestionComponent,
    FormPersonalInfoComponent,
    FormViewComponent,
    QuestionGroupViewComponent,
    StatisticsComponent,
    StatisticsQuestionGroupViewComponent,
    MigrationComponent
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
    CommonModule,
    ClipboardModule
  ],
  providers: [
    AuthService,
    FormServiceService,
    AccountService,
    ExcelService,
    DocService,
    MigrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
