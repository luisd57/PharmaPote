import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ITreatment } from '../interfaces/Treatment.interface';
import { ITreamentResponse } from '../interfaces/TreatmentResponse.interface';
import { IMedicationInTreatment } from '../interfaces/MedicationInTreatment.interface';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private apiURL = 'http://localhost:3000/api/treatments';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  createTreatment(treatment: ITreatment): Observable<ITreamentResponse> {
    return this.http.post<ITreamentResponse>(`${this.apiURL}/create`, treatment, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  updateTreatment(treatment: ITreatment): Observable<ITreamentResponse> {
    return this.http.put<ITreamentResponse>(`${this.apiURL}/edit/${treatment._id}`, treatment, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  deleteTreatment(id: string | undefined): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  getUserTreatments(): Observable<ITreatment[]> {
    return this.http.get<ITreatment[]>(`${this.apiURL}`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  getAllTreatments(): Observable<ITreatment[]> {
    return this.http.get<ITreatment[]>(`${this.apiURL}/all`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  deleteMedicationFromTreatment(treatmentId: string, medicationId: string): Observable<ITreamentResponse> {
    return this.http.delete<ITreamentResponse>(`${this.apiURL}/${treatmentId}/medications/${medicationId}`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  setMedicationSchedule(treatmentId: string, medicationId: string, schedule: string): Observable<ITreamentResponse> {
    return this.http.put<ITreamentResponse>(`${this.apiURL}/${treatmentId}/medications/${medicationId}`, schedule, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  setStrictnessLevel(treatmentId: number, strictnessLevel: string): Observable<ITreamentResponse> {
    return this.http.put<ITreamentResponse>(`${this.apiURL}/${treatmentId}/strictness`, strictnessLevel, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  setTreatmentState(treatmentId: string | undefined, state: string): Observable<ITreamentResponse> {
    return this.http.put<ITreamentResponse>(`${this.apiURL}/${treatmentId}/state`, { state }, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  getTreatmentMedications(treatmentId: string): Observable<IMedicationInTreatment[]> {
    return this.http.get<IMedicationInTreatment[]>(`${this.apiURL}/${treatmentId}/medications`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  getTreatmentById(treatmentId: string): Observable<ITreatment> {
    return this.http.get<ITreatment>(`${this.apiURL}/${treatmentId}`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

}
