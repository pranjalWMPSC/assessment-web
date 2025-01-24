import { Component } from '@angular/core';
import { AdminLoginService } from '../../services/admin-login.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.adminLoginService.login(username, password).subscribe(response => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.toastr.success('Login successful');
          console.log('Navigating to admin dashboard');
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.toastr.error('Login failed');
        }
      }, error => {
        this.toastr.error('Login failed');
      });
    } else {
      this.toastr.error('Please fill in all fields');
    }
  }
}
