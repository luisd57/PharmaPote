import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guards/auth.guard';
import { CreateTreatmentComponent } from './components/create-treatment/create-treatment.component';
import { ListTreatmentComponent } from './components/list-treatment/list-treatment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "auth", component: AuthComponent },
  {
    path: "", component: NavbarComponent, canActivate: [authGuard],
    children: [
      { path: "treatments/create", component: CreateTreatmentComponent },
      { path: "treatments/edit/:id", component: CreateTreatmentComponent },
      { path: "treatments/list", component: ListTreatmentComponent },
      { path: "dashboard", component: DashboardComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
