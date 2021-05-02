import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteConfigLoadEnd, Router, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './post-login/home/home.component';
import { MathComponent } from './post-login/math/math.component';
import { ScienceComponent } from './post-login/science/science.component';
import { EnglishComponent } from './post-login/english/english.component';
import { HistoryComponent } from './post-login/history/history.component';
import { LanguageComponent } from './post-login/language/language.component';
import { ElectiveComponent } from './post-login/elective/elective.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './post-login/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './post-login/main/main.component';

const appRoutes = [
  {path: '', component: LoginComponent},
  {path: 'main', component: MainComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'math', component: MathComponent},
    {path: 'science', component: ScienceComponent},
    {path: 'english', component: EnglishComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'language', component: LanguageComponent},
    {path: 'elective', component: ElectiveComponent},
  ]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MathComponent,
    ScienceComponent,
    EnglishComponent,
    HistoryComponent,
    LanguageComponent,
    ElectiveComponent,
    SidebarComponent,
    LoginComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
