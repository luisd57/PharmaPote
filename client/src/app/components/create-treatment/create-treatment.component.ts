import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IMedicament } from 'src/app/interfaces/Medication.interface';
import { ITreatment } from 'src/app/interfaces/Treatment.interface';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private fb: FormBuilder, private treatmentService: TreatmentService, private authService: AuthService) {
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

  addScheduleHour(medicationIndex: number, time: string): void {
    const schedule = this.getSchedule(medicationIndex);
    if (schedule.length < this.maxScheduleHours) {
      schedule.push(this.fb.control(time, [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]));
    }
  }

  removeScheduleHour(medicationIndex: number, hourIndex: number): void {
    const schedule = this.getSchedule(medicationIndex);
    schedule.removeAt(hourIndex);
  }

  get medications(): FormArray {
    return this.treatmentForm.get('medications') as FormArray;
  }

  onMedicamentSelected(medicament: IMedicament, index: number): void {
    const medication = this.medications.at(index) as FormGroup;
    medication.controls['medicamentId'].setValue(medicament._id);
    medication.addControl('substance', this.fb.control(medicament.substance));
  }

  onSubmit(): void {
    if (this.treatmentForm.valid) {
      const userId = this.authService.getCurrentUser()?._id
      const treatment: ITreatment = {
        ...this.treatmentForm.value,
        userId: userId,
        state: 'ongoing'
      };

      this.treatmentService.createTreatment(treatment).subscribe(
        res => {
          console.log('Treatment created:', res);
          // TODO
        },
        error => {
          console.error('Error creating treatment:', error);
          // TODO
        }
      );
    }
  }


}
