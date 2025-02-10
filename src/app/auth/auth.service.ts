import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';
  private http = inject(HttpClient);

  constructor() {}

  register(username: string, password: string, email: string): Observable<any> {
    const body = { username, password, email };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        console.log('Login response:', response); // Log the response to check the token
        const token = response.token;
        const message = response.message;
        const userId = response.userId;
        if (token && userId) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
        } else {
          console.error('Token is undefined');
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
