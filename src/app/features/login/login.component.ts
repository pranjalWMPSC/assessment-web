import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    NavbarComponent
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    console.log('Form submitted');
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          console.log('Response received', response);
          if (response.success) {
            const tpName = response.data.name; // Assuming the response contains the TP name
            this.authService.setTpEmail(email, tpName); // Set TP email and name after successful login
            localStorage.setItem('tpEmail', email); // Set TP email in local storage
            this.toastr.success('Login successful', 'Success');
            this.router.navigate(['/batch-list']); // Navigate to BatchListComponent
          } else {
            this.toastr.error('Login failed: ' + response.message, 'Error');
            this.errorMessage = response.message;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log('Error received', error);
          if (error.status === 401) {
            if (error.error.message === 'Invalid credentials: TP not found') {
              this.toastr.error('Login failed: TP not found', 'Error');
              this.errorMessage = 'Invalid credentials: TP not found';
            } else {
              this.toastr.error('Login failed: Invalid credentials', 'Error');
              this.errorMessage = 'Invalid credentials';
            }
          } else {
            this.toastr.error('Login failed: ' + error.message, 'Error');
            this.errorMessage = error.message;
          }
        }
      });
    }
  }
}
