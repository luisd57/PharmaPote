import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { CreateTreatmentComponent } from './components/create-treatment/create-treatment.component';
import { ListTreatmentComponent } from './components/list-treatment/list-treatment.component';
import { MedicamentInputComponent } from './components/medicament-input/medicament-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    AuthComponent,
    AuthFormComponent,
    CreateTreatmentComponent,
    ListTreatmentComponent,
    MedicamentInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
