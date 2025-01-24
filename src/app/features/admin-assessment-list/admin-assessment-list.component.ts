import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../../shared/components/admin-navbar/admin-navbar.component';
import { AssessmentService } from '../../services/assessment.service';
import { CommonModule } from '@angular/common';
import { AdminLoginService } from '../../services/admin-login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

interface Assessment {
  name: string;
  time: string;
  date: string;
  qpName: string;
  qpCode: string;
  metadata: string;
  numberOfQuestions: number;
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  nos: {
    code: string;
    numberOfQuestions: number;
  }[];
  createdAt: string;
  updatedAt: string;
  subject: string;
  _id: string;
}

@Component({
  selector: 'app-admin-assessment-list',
  templateUrl: './admin-assessment-list.component.html',
  styleUrls: ['./admin-assessment-list.component.css'],
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, HttpClientModule] // Include HttpClientModule here
})
export class AdminAssessmentListComponent implements OnInit {
  assessments: Assessment[] = [];
  selectedAssessment: Assessment | null = null;
  loading = true;
  showConfirmDelete = false;

  constructor(
    private assessmentService: AssessmentService,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assessmentService.getAssessments().subscribe((response: any) => {
      this.loading = false;
      if (response.success && Array.isArray(response.data)) {
        this.assessments = response.data;
      } else {
        console.error('Expected an array of assessments');
      }
    }, error => {
      this.loading = false;
      console.error('Failed to fetch assessments', error);
    });
  }

  selectAssessment(assessment: Assessment): void {
    this.selectedAssessment = assessment;
  }

  closeModal(): void {
    this.selectedAssessment = null;
  }

  confirmDelete(assessment: Assessment, event: Event): void {
    event.stopPropagation();
    this.selectedAssessment = assessment;
    this.showConfirmDelete = true;
  }

  cancelDelete(): void {
    this.showConfirmDelete = false;
    this.selectedAssessment = null;
  }

  deleteAssessment(): void {
    if (this.selectedAssessment) {
      this.adminLoginService.deleteAssessment(this.selectedAssessment._id).subscribe(response => {
        if (response.success) {
          this.toastr.success('Assessment deleted successfully');
          this.assessments = this.assessments.filter(a => a._id !== this.selectedAssessment!._id);
          this.closeModal();
          this.showConfirmDelete = false;
        } else {
          this.toastr.error(response.message || 'Failed to delete assessment');
        }
      }, error => {
        this.toastr.error('Failed to delete assessment');
      });
    }
  }

  redirectToCreate(): void {
    this.router.navigate(['/admin/assessments/create']);
  }

  addQuestion(): void {
    if (this.selectedAssessment) {
      this.router.navigate(['/admin/assessments/add-question', this.selectedAssessment._id]);
    }
  }
}
