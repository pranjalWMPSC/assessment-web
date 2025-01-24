import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {} // Inject AuthService

  getAssessments(): Observable<any> {
    const token = this.authService.getToken(); // Retrieve the token from AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/assessment/list`, { headers });
  }

  uploadQuestions(assessmentId: string, questions: any[]): Observable<any> {
    const token = this.authService.getToken(); // Retrieve the token from AuthService
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/admin/questions`, { questions }, { headers });
  }
}
