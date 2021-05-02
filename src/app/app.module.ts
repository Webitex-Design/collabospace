import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteConfigLoadEnd, Router, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MathComponent } from './math/math.component';
import { ScienceComponent } from './science/science.component';
import { EnglishComponent } from './english/english.component';
import { HistoryComponent } from './history/history.component';
import { LanguageComponent } from './language/language.component';
import { ElectiveComponent } from './elective/elective.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'math', component: MathComponent},
  {path: 'science', component: ScienceComponent},
  {path: 'english', component: EnglishComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'language', component: LanguageComponent},
  {path: 'elective', component: ElectiveComponent},
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
