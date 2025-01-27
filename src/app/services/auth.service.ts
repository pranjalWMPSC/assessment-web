import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8888/.netlify/functions/server'; // Updated base URL
  private tpEmailKey = 'tpEmail';
  private tpNameKey = 'tpName';
  private tpEmailExpiryKey = 'tpEmailExpiry';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/tp/login`;
    const body = { email, password };
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError)
    );
  }

  setTpEmail(email: string, name: string): void {
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
    localStorage.setItem(this.tpEmailKey, email);
    localStorage.setItem(this.tpNameKey, name);
    localStorage.setItem(this.tpEmailExpiryKey, expiryTime.toString());
  }

  getTpEmail(): string | null {
    const expiryTime = localStorage.getItem(this.tpEmailExpiryKey);
    if (expiryTime && new Date().getTime() < parseInt(expiryTime, 10)) {
      return localStorage.getItem(this.tpEmailKey);
    } else {
      this.clearTpEmail();
      return null;
    }
  }

  getTpName(): string | null {
    const expiryTime = localStorage.getItem(this.tpEmailExpiryKey);
    if (expiryTime && new Date().getTime() < parseInt(expiryTime, 10)) {
      return localStorage.getItem(this.tpNameKey);
    } else {
      this.clearTpEmail();
      return null;
    }
  }

  clearTpEmail(): void {
    localStorage.removeItem(this.tpEmailKey);
    localStorage.removeItem(this.tpNameKey);
    localStorage.removeItem(this.tpEmailExpiryKey);
    sessionStorage.clear();
  }

  getTpDetails(email: string): Observable<any> {
    const url = `${this.baseUrl}/tp/details/${email}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  tpLogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tp/login`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
