import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, RouterModule, CommonModule]
})
export class NavbarComponent implements OnInit {
  tpName: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.tpName = this.authService.getTpName();
    this.isLoggedIn = !!this.tpName;
  }

  logout() {
    this.authService.clearTpEmail(); // Clear session data
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Navigate to login page
  }
}
