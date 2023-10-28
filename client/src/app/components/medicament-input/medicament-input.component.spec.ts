import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentInputComponent } from './medicament-input.component';

describe('MedicamentInputComponent', () => {
  let component: MedicamentInputComponent;
  let fixture: ComponentFixture<MedicamentInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentInputComponent]
    });
    fixture = TestBed.createComponent(MedicamentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
