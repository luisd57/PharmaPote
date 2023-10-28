import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ITreatment } from 'src/app/interfaces/Treatment.interface';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-create-treatment',
  templateUrl: './create-treatment.component.html',
  styleUrls: ['./create-treatment.component.scss']
})
export class CreateTreatmentComponent {
  treatmentForm: FormGroup;
  maxMedications: number = 6;
  maxScheduleHours: number = 3;

  constructor(private fb: FormBuilder, private treatmentService: TreatmentService) {
    this.treatmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      medications: this.fb.array([]),
      strictnessLevel: ['low', Validators.required]
    });
  }

  addMedication(): void {
    if (this.medications.length < this.maxMedications) {
      const medication = this.fb.group({
        medicamentId: ['', Validators.required],
        schedule: this.fb.array([]),
        taken: [false]
      });
      this.medications.push(medication);
    }
  }

  removeMedication(index: number): void {
    this.medications.removeAt(index);
  }

  getSchedule(medicationIndex: number): FormArray {
    return this.medications.at(medicationIndex).get('schedule') as FormArray;
  }

  addScheduleHour(medicationIndex: number): void {
    const schedule = this.getSchedule(medicationIndex);
    if (schedule.length < this.maxScheduleHours) {
      schedule.push(this.fb.control('', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]));
    }
  }

  removeScheduleHour(medicationIndex: number, hourIndex: number): void {
    const schedule = this.getSchedule(medicationIndex);
    schedule.removeAt(hourIndex);
  }

  get medications(): FormArray {
    return this.treatmentForm.get('medications') as FormArray;
  }

  onSubmit(): void {
    if (this.treatmentForm.valid) {
      const treatment: ITreatment = {
        ...this.treatmentForm.value,
        userId: 'YourUserIdHere', // TODO: Get this from authentication or some other source
        state: 'ongoing' // default state for new treatments
      };
  
      this.treatmentService.createTreatment(treatment).subscribe(
        res => {
          console.log('Treatment created:', res);
          // TODO: Handle success - navigate, show message, etc.
        },
        error => {
          console.error('Error creating treatment:', error);
          // TODO: Handle error - show error message, etc.
        }
      );
    }
  }
}
