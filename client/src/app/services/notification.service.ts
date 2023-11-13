import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { INotification } from '../interfaces/Notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiURL = 'http://localhost:3000/api/notifications';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(`${this.apiURL}/all`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  getUserNotifications(userId: string | undefined): Observable<INotification[]> {
    return this.http.get<INotification[]>(`${this.apiURL}/${userId}`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  markAsSeen(notificationId: string): Observable<INotification> {
    return this.http.patch<INotification>(`${this.apiURL}/${notificationId}/seen`, {}, { headers: this.headers, withCredentials: true }).pipe(
      catchError(err => throwError(() => err)));
  }

  markAllAsSeen(userId: string): Observable<INotification[]> {
    return this.http.put<INotification[]>(`${this.apiURL}/all/seen`, { userId }, { headers: this.headers, withCredentials: true })
      .pipe(catchError(err => throwError(() => err)));
  }

}
