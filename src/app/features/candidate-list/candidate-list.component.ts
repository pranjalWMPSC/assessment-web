import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

interface Candidate {
  id: string;
  name: string;
  phone: string;
  aadharNumber: string;
  assessmentCompleted: boolean;
}

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent
  ]
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  loading: boolean = true;
  batchId: string | null = null;
  tpEmail: string | null = null;
  errorMessage: string | null = null;

  constructor(private candidateService: CandidateService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.batchId = localStorage.getItem('selectedBatchId');
    this.tpEmail = localStorage.getItem('tpEmail');
    if (!this.batchId || !this.tpEmail) {
      this.loading = false;
      return;
    }

    this.candidateService.getCandidatesByBatch(this.batchId, this.tpEmail).subscribe((response: any) => {
      if (response.success && Array.isArray(response.candidates)) {
        this.candidates = response.candidates.map((candidate: any) => ({
          id: candidate._id,
          name: `${candidate.firstName} ${candidate.lastName}`,
          phone: candidate.mobileNumber,
          aadharNumber: candidate.aadharNumber,
          assessmentCompleted: candidate.examination.status === 'Passed'
        }));
      } else if (response.success && Array.isArray(response.data)) {
        this.candidates = response.data.map((candidate: any) => ({
          id: candidate._id,
          name: `${candidate.firstName} ${candidate.lastName}`,
          phone: candidate.mobileNumber,
          aadharNumber: candidate.aadharNumber,
          assessmentCompleted: candidate.examination.status === 'Passed'
        }));
      } else {
        console.error('Invalid response data');
      }
      this.loading = false;
    }, error => {
      console.error('Error fetching candidates:', error);
      this.errorMessage = 'Failed to load candidates. Please check your network connection and try again.';
      this.loading = false;
    });
  }

  startAssessment(candidate: Candidate): void {
    if (candidate.assessmentCompleted) {
      alert('Assessment already completed');
    } else {
      localStorage.setItem('selectedCandidate', JSON.stringify(candidate));
      this.router.navigate(['/instructions', candidate.id]);
    }
  }

  goToBatchList(): void {
    this.router.navigate(['/batch-list']);
  }

  logout(): void {
    this.authService.clearTpEmail();
    this.router.navigate(['/login']);
  }
}
