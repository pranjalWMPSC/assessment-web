import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = 'https://wmpsc-main-api.netlify.app/.netlify/functions/server'; // Updated base URL

  constructor(private http: HttpClient) {}

  getCandidatesByBatch(batchId: string, tpEmail: string): Observable<any> {
    const url = `${this.baseUrl}/candidates/batch/${batchId}/tp/${tpEmail}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getBatchesByTp(tpEmail: string): Observable<any> {
    const url = `${this.baseUrl}/candidates/tp/${tpEmail}/batches`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  uploadCandidates(candidates: any[]): Observable<any> {
    const url = `${this.baseUrl}/api/candidates/bulk`;
    return this.http.post<any>(url, candidates).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend error
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(errorMessage);
  }
}
