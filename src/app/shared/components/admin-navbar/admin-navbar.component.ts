import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class AdminNavbarComponent {
  constructor(private router: Router) {}

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin-login']);
  }
}
