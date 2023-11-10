import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
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

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData) as IUser;
    }
  }

  private storeCurrentUser(user: IUser): void {
    const userData = {
      _id: user._id,
      role: user.role
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  private clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  register(user: IUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/register`, user, { headers: this.headers, withCredentials: true }).pipe(
      tap(response => {
        this.currentUser = response.user;
        this.storeCurrentUser(this.currentUser);
      }),
      catchError(err => throwError(() => err)));
  }

  login(user: IUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, user, { headers: this.headers, withCredentials: true }).pipe(
      tap(response => {
        this.currentUser = response.user;
        this.storeCurrentUser(this.currentUser);
      }),
      catchError(err => throwError(() => err)));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiURL}/logout`, {}, { headers: this.headers, withCredentials: true }).pipe(
      tap(() => {
        this.currentUser = null;
        this.clearCurrentUser();
      }),
      catchError(err => throwError(() => err))
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/isAuthenticated`, { headers: this.headers, withCredentials: true });
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/token`, {}, { headers: this.headers, withCredentials: true }).pipe(
      tap(response => {
        this.currentUser = response.user;
        this.storeCurrentUser(this.currentUser);
      }),
      catchError(err => throwError(() => err))
    );
  }

  getCurrentUser(): IUser | null {
    return this.currentUser;
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<{ role: string }>(`${this.apiURL}/getCurrentUserRole`, { headers: this.headers, withCredentials: true })
      .pipe(
        map(response => response.role === 'admin'),
        catchError(() => of(false))
      );
  }

}
