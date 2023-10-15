import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IUser } from '../interfaces/User.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/AuthResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:3000/api/auth';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private currentUser: IUser | null = null;

  constructor(private http: HttpClient) { }

  register(user: IUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/register`, user, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
      tap(response => this.currentUser = response.user)
    );
  }

  login(user: IUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, user, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
      tap(response => this.currentUser = response.user)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiURL}/logout`, {}, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
      tap(() => this.currentUser = null)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/isAuthenticated`, { headers: this.headers, withCredentials: true });
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/token`, {}, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
      tap(response => this.currentUser = response.user)
    );
  }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

}