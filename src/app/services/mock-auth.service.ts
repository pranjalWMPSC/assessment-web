import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  login(email: string, password: string): Observable<any> {
    if (email === 'test@example.com' && password === 'password123') {
      return of({ success: true, token: 'fake-jwt-token' });
    } else {
      return of({ success: false, message: 'Invalid credentials' });
    }
  }

  // Add other mock methods as needed
}
