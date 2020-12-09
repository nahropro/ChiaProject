import { environment } from './../environments/environment';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatrialsModule } from './models/matrials-module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { FillFormComponent } from './components/fill-form/fill-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateFormComponent,
    UpdateFormComponent,
    ListFormComponent,
    FillFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatrialsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
