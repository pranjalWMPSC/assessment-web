import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../services/admin-login.service';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from "../../shared/components/admin-navbar/admin-navbar.component";
import { Router } from '@angular/router';

interface TP {
  _id: string;
  status: string;
  name: string;
  email: string;
  spocName: string;
  mobileNumber: string;
}

@Component({
  selector: 'app-admin-tp-list',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent],
  templateUrl: './admin-tp-list.component.html',
  styleUrls: ['./admin-tp-list.component.css']
})
export class AdminTpListComponent implements OnInit {
  tps: TP[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private adminLoginService: AdminLoginService) {}

  ngOnInit(): void {
    this.loadTPs();
  }

  loadTPs(): void {
    this.isLoading = true;
    this.error = null;

    this.adminLoginService.listTPs().subscribe({
      next: (response) => {
        if (response && response.tps) {
          this.tps = response.tps;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching TPs', err);
        this.error = 'Failed to load training partners';
        this.isLoading = false;
      }
    });
  }

  toggleTPStatus(tp: TP) {
    const newStatus = tp.status === 'active' ? 'inactive' : 'active';
    this.adminLoginService.updateTPStatus(tp._id, newStatus).subscribe(
      (response) => {
        tp.status = newStatus;
      },
      (error) => {
        console.error('Error updating TP status', error);
      }
    );
  }

  addNewTP() {
    // You can navigate to a new component for TP creation
    // or implement a modal/dialog here
    console.log('Navigate to TP creation page');
  }
}
