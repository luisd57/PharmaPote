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
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotificationBellComponent } from './components/notification-bell/notification-bell.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    AuthComponent,
    AuthFormComponent,
    CreateTreatmentComponent,
    ListTreatmentComponent,
    MedicamentInputComponent,
    CapitalizePipe,
    DashboardComponent,
    NotificationBellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
