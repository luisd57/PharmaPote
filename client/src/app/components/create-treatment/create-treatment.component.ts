import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMedicament } from 'src/app/interfaces/Medication.interface';
import { ITreatment } from 'src/app/interfaces/Treatment.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TreatmentService } from 'src/app/services/treatment.service';
import { forkJoin, map } from 'rxjs';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-create-treatment',
  templateUrl: './create-treatment.component.html',
  styleUrls: ['./create-treatment.component.scss']
})
export class CreateTreatmentComponent implements OnInit {
  treatmentForm: FormGroup;
  maxMedications: number = 6;
  maxScheduleHours: number = 3;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private treatmentService: TreatmentService,
    private authService: AuthService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private medicamentService: MedicamentService
  ) {
    this.treatmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      medications: this.fb.array([]),
      strictnessLevel: ['low', Validators.required]
    });
  }

  ngOnInit(): void {
    const treatmentId = this.activatedRoute.snapshot.paramMap.get('id');
    if (treatmentId) {
      this.isEditMode = true;
      this.loadTreatment(treatmentId);
    }
  }


  loadTreatment(treatmentId: string): void {
    this.treatmentService.getTreatmentById(treatmentId).subscribe({
      next: (treatment: ITreatment) => {
        this.populateForm(treatment);
      },
      error: (err) => {
        console.error('Failed to fetch treatment:', err);
      }
    });
  }

  populateForm(treatment: ITreatment): void {
    // Populate basic fields
    this.treatmentForm.patchValue({
      name: treatment.name,
      strictnessLevel: treatment.strictnessLevel
    });

    const medicationObservables = treatment.medications.map(medication =>
      this.medicamentService.getMedicamentById(medication.medicamentId).pipe(
        map(medicament => {
          return {
            ...medication,
            substance: medicament.substance
          };
        })
      )
    );

    forkJoin(medicationObservables).subscribe(medicationsWithSubstances => {
      const medicationFGs = medicationsWithSubstances.map(medication => {
        return this.fb.group({
          medicamentId: medication.medicamentId,
          schedule: this.fb.array(medication.schedule || []),
          taken: medication.taken,
          substance: medication.substance
        });
      });
      const medicationFormArray = this.fb.array(medicationFGs);
      this.treatmentForm.setControl('medications', medicationFormArray);
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

  onMedicamentSelected(medicament: IMedicament): void {
    const medication = this.fb.group({
      medicamentId: [medicament._id, Validators.required],
      schedule: this.fb.array([]),
      taken: [false],
      substance: [medicament.substance]
    });
    this.medications.push(medication);
  }

  onSubmit(): void {
    const treatmentId = this.activatedRoute.snapshot.paramMap.get('id');
    const userId = this.authService.getCurrentUser()?._id;
    const treatment: ITreatment = {
      ...this.treatmentForm.value,
      userId: userId,
      state: 'ongoing'
    };

    if (treatmentId) {
      treatment._id = treatmentId;
      this.treatmentService.updateTreatment(treatment).subscribe({
        next: (res) => {
          console.log('Treatment updated:', res);
        },
        error: (error) => {
          console.error('Error updating treatment:', error);
        }
      });
    } else {
      this.treatmentService.createTreatment(treatment).subscribe({
        next: (res) => {
          console.log('Treatment created:', res);
        },
        error: (error) => {
          console.error('Error creating treatment:', error);
        }
      });
    }
  }


}