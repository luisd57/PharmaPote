import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreatmentComponent } from './list-treatment.component';

describe('ListTreatmentComponent', () => {
  let component: ListTreatmentComponent;
  let fixture: ComponentFixture<ListTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTreatmentComponent]
    });
    fixture = TestBed.createComponent(ListTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
