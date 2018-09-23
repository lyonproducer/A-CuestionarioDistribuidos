import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/manual/create-user/create-user.component';
import { SelectQuestionsComponent } from './components/manual/select-questions/select-questions.component';
import { PensamientoComponent } from './components/manual/questions/pensamiento/pensamiento.component';
import { SentimientoComponent } from './components/manual/questions/sentimiento/sentimiento.component';
import { InstintoComponent } from './components/manual/questions/instinto/instinto.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AutomaticComponent } from './components/automatic/automatic.component';

const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'createUser', component: CreateUserComponent},
  {path: 'userList', component: UserListComponent},
  {path: 'selectQuestions', component: SelectQuestionsComponent},
  {path: 'selectQuestions/questionsPensamiento/:tipo', component: PensamientoComponent},
  {path: 'selectQuestions/questionsSentimiento', component: SentimientoComponent},
  {path: 'selectQuestions/questionsInstinto', component: InstintoComponent},
  {path: 'simulation', component: AutomaticComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CreateUserComponent,
    SelectQuestionsComponent,
    PensamientoComponent,
    SentimientoComponent,
    InstintoComponent,
    UserListComponent,
    AutomaticComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
