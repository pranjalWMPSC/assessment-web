import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../services/admin-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from "../../shared/components/admin-navbar/admin-navbar.component";
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule, FormsModule, AdminNavbarComponent, RouterModule],
  templateUrl: './admin-tp-list.component.html',
  styleUrls: ['./admin-tp-list.component.css'],
  providers: [AdminLoginService]
})
export class AdminTpListComponent implements OnInit {
  tps: TP[] = [];
  isLoading = true;
  error: string | null = null;
  selectedTP: TP | null = null;
  showModal = false;
  showAddModal = false;
  newTP: Partial<TP> & { password?: string } = {};

  constructor(private adminLoginService: AdminLoginService) {}

  ngOnInit(): void {
    this.loadTPs();
  }

  loadTPs(): void {
    this.isLoading = true;
    this.error = null;

    this.adminLoginService.listTPs().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.tps = response.data;
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
    this.selectedTP = tp;
    this.showModal = true;
  }

  confirmToggleStatus() {
    if (this.selectedTP) {
      const newStatus = this.selectedTP.status === 'active' ? 'inactive' : 'active';
      this.adminLoginService.updateTPStatus(this.selectedTP.email, newStatus).subscribe(
        (response) => {
          this.selectedTP!.status = newStatus;
          this.showModal = false;
          this.selectedTP = null;
        },
        (error) => {
          console.error('Error updating TP status', error);
          this.showModal = false;
          this.selectedTP = null;
        }
      );
    }
  }

  cancelToggleStatus() {
    this.showModal = false;
    this.selectedTP = null;
  }

  addNewTP() {
    this.showAddModal = true;
  }

  confirmAddTP() {
    if (this.newTP.name && this.newTP.email && this.newTP.spocName && this.newTP.mobileNumber && this.newTP.password) {
      const newTP: TP = {
        _id: '',
        status: 'active',
        name: this.newTP.name,
        email: this.newTP.email,
        spocName: this.newTP.spocName,
        mobileNumber: this.newTP.mobileNumber,
        password: this.newTP.password
      } as TP;
      this.adminLoginService.createTP(newTP).subscribe(
        (response) => {
          this.loadTPs();
          this.showAddModal = false;
          this.newTP = {};
        },
        (error) => {
          console.error('Error adding new TP', error);
        }
      );
    }
  }

  cancelAddTP() {
    this.showAddModal = false;
    this.newTP = {};
  }
}
