import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './home/register/register.component';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {  }
