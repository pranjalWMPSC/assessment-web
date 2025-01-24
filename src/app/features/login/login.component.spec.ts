import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { MockAuthService } from '../../services/mock-auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, NavbarComponent],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: MockAuthService, useClass: MockAuthService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(MockAuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when email and password are provided', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should have an invalid form when email is missing', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should have an invalid form when password is missing', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should make a login request', () => {
    const dummyResponse = { success: true, token: 'fake-jwt-token' };
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();

    authService.login('test@example.com', 'password123').subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });
  });
});
