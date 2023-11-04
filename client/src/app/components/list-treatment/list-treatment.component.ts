import { Component } from '@angular/core';
import { ITreatment } from 'src/app/interfaces/Treatment.interface';
import { IUser } from 'src/app/interfaces/User.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-list-treatment',
  templateUrl: './list-treatment.component.html',
  styleUrls: ['./list-treatment.component.scss']
})
export class ListTreatmentComponent {
  treatments: ITreatment[] = [];
  currentUser: IUser | null = null;
  treatmentStates: ('ongoing' | 'finished')[] = ['ongoing', 'finished'];


  constructor(private treatmentService: TreatmentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.authService.isAuthenticated().subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.currentUser = this.authService.getCurrentUser();
          this.fetchTreatments();
        } else {
          console.warn("User not authenticated. Cannot fetch treatments.");
        }
      },
      error: (error) => {
        console.error("Error checking authentication:", error);
      }
    })
  }

  fetchTreatments(): void {
    this.treatmentService.getUserTreatments().subscribe({
      next: (treatments: ITreatment[]) => {
        this.treatments = treatments;
      },
      error: (error) => {
        console.error("Error fetching treatments:", error);
      }
    })
  }

  setTreatmentState(id: string | undefined, state: 'ongoing' | 'finished'): void {
    this.treatmentService.setTreatmentState(id, state).subscribe({
      next: () => {
        this.fetchTreatments();
      },
      error: (error) => {
        console.error("Error setting treatment state:", error);
      }
    })
  }

  onDeleteTreatment(id: string | undefined): void {
    this.treatmentService.deleteTreatment(id).subscribe({
      next: () => {
        this.fetchTreatments();
      },
      error: (error) => {
        console.error("Error deleting treatment:", error);
      }
    })
  }


}
