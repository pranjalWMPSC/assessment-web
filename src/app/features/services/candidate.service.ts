import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'http://localhost:8888/.netlify/functions/server';

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates`);
  }

  getCandidateById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/${id}`);
  }

  searchByAadhar(aadhar: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/search`, { params: { aadhar } });
  }

  getTpBatches(tpEmail: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/tp/${tpEmail}/batches`);
  }

  getCandidatesByBatch(batchId: string, tpEmail: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/batch/${batchId}/tp/${tpEmail}`);
  }

  getCandidatesByTp(tpEmail: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/candidates/tp/${tpEmail}`);
  }

  createCandidate(candidate: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/candidates`, candidate);
  }

  bulkCreateCandidates(candidates: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/candidates/bulk`, candidates);
  }

  updateCandidate(id: string, candidate: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/candidates/${id}`, candidate);
  }

  deleteCandidate(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/candidates/${id}`);
  }

  completeAssessment(id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/candidates/${id}/complete`, {});
  }
}
