import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private apiUrl = 'https://wmpsc-main-api.netlify.app/.netlify/functions/server/assessments'; // Updated base URL

  constructor(private http: HttpClient) {}

  getAssessments(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'Cookie': 'wmpsc.sid=s%3A8cyaABdmT5lqCsoUiaH1e31D1y0d9cDi.ovS2sgsSXjvE9ZaiLiA0Va5FTTycYvWM0bhbOIgw7co'
      }
    });
  }
}
