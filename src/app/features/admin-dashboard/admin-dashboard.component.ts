import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../shared/components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent]
})
export class AdminDashboardComponent {

}
