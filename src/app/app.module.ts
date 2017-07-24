import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LocalstorageService } from './localstorage.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PersonComponent } from './person.component';
import { PersonInformationComponent } from './person-information.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: HomeComponent},
  {path: 'add', component: PersonComponent},
  {path: ':id', component: PersonInformationComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonComponent,
    PersonInformationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LocalstorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
