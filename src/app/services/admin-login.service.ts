import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  private baseUrl = `${environment.baseUrl}/admin`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password });
  }

  createAdmin(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, { username, password }, { headers: this.getAuthHeaders() });
  }

  listAllTPs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tps`, { headers: this.getAuthHeaders() });
  }

  countCompletedCandidates(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/completed`, { headers: this.getAuthHeaders() });
  }

  listCandidatesByTP(tpId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/tp/${tpId}`, { headers: this.getAuthHeaders() });
  }

  listCandidatesByBatch(batchId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/batch/${batchId}`, { headers: this.getAuthHeaders() });
  }

  createAssessment(assessmentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/assessments`, assessmentData, { headers: this.getAuthHeaders() });
  }

  uploadQuestion(questionData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/questions`, questionData, { headers: this.getAuthHeaders() });
  }

  listQuestionsByAssessment(assessmentId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/assessments/${assessmentId}/questions`, { headers: this.getAuthHeaders() });
  }

  listBatchesByTP(tpId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tp/${tpId}/batches`, { headers: this.getAuthHeaders() });
  }

  getAssessments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/assessments`, { headers: this.getAuthHeaders() });
  }

  deleteAssessment(assessmentId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/assessments/${assessmentId}`, { headers });
  }

  listTPs(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tps`, { headers: this.getAuthHeaders() });
  }

  createTP(tpData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tp/create`, tpData, { headers: this.getAuthHeaders() });
  }

  updateTPStatus(tpId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/tp/${tpId}/status`, { status }, { headers: this.getAuthHeaders() });
  }
}
