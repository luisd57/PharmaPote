import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/User.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl, { headers: this.headers, withCredentials: true });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers: this.headers, withCredentials: true });
  }

}