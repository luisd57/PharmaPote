import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatmentComponent } from './create-treatment.component';

describe('CreateTreatmentComponent', () => {
  let component: CreateTreatmentComponent;
  let fixture: ComponentFixture<CreateTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTreatmentComponent]
    });
    fixture = TestBed.createComponent(CreateTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
