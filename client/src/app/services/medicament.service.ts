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

  getMedicaments(searchTerm?: string): Observable<IMedicament[]> {
    const url = searchTerm ? `${this.apiURL}?search=${searchTerm}` : this.apiURL;
    return this.http.get<IMedicament[]>(url, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
    );
  }

}
