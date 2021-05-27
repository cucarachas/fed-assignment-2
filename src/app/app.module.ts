import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BugsComponent } from './bugs/bugs.component';
import { RouterModule, Routes } from '@angular/router';
import { BugComponent } from './bug/bug.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BugDetailsComponent } from './bug-details/bug-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {path: '', component: BugsComponent},
  {path: 'bug', component: BugComponent},
  {path: 'bug/:id', component: BugDetailsComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BugsComponent,
    BugComponent,
    PageNotFoundComponent,
    BugDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
