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

  getMedicaments(searchTerm: string): Observable<IMedicament[]> {
    if (!searchTerm) {
      return throwError(() => new Error('Search term is required'));
    }

    const url = `${this.apiURL}?search=${searchTerm}`;
    return this.http.get<IMedicament[]>(url, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  getMedicamentById(id: string): Observable<IMedicament> {
    if (!id) {
      return throwError(() => new Error('ID is required'));
    }

    const url = `${this.apiURL}/${id}`;
    return this.http.get<IMedicament>(url, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

}
