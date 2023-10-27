import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMedicament } from '../interfaces/Medication.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  private apiURL = 'http://localhost:3000/api/medicaments';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getMedicaments(): Observable<IMedicament[]> {
    return this.http.get<IMedicament[]>(`${this.apiURL}`, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
    );
  }
}
