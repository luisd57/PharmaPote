import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { IMedicament } from 'src/app/interfaces/Medication.interface';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-medicament-input',
  templateUrl: './medicament-input.component.html',
  styleUrls: ['./medicament-input.component.scss']
})
export class MedicamentInputComponent {
  medicaments: IMedicament[] = [];
  inputCtrl = new FormControl();

  @Output() medicamentSelected = new EventEmitter<IMedicament>();

  constructor(private medicamentService: MedicamentService) { }

  ngOnInit(): void {
    this.inputCtrl.valueChanges.pipe(
      debounceTime(300),
      filter(value => !!value && value.trim().length > 0),
      switchMap(value => this.medicamentService.getMedicaments(value))
    ).subscribe(data => {
      this.medicaments = data;
    });
  }

  selectMedicament(medicament: IMedicament): void {
    this.medicamentSelected.emit(medicament);
    this.inputCtrl.reset();
    this.medicaments = [];
  }

}

