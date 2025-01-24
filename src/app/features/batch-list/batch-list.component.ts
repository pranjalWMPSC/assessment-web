import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

interface Batch {
  id: string;
  name: string;
  candidateCount: number;
  lastUpdated: string;
}

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent
  ]
})
export class BatchListComponent implements OnInit {
  batches: Batch[] = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private candidateService: CandidateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const tpEmail = this.authService.getTpEmail();
    if (tpEmail) {
      this.candidateService.getBatchesByTp(tpEmail).subscribe(response => {
        if (response.success) {
          this.batches = response.data.map((batch: any) => ({
            id: batch.batchId,
            name: batch.batchName,
            candidateCount: batch.candidateCount,
            lastUpdated: batch.lastUpdated
          }));
        }
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        console.error('Error fetching batches:', error.message);
        this.loading = false;
      });
    } else {
      // Handle case where tpEmail is not set
      console.error('TP email is not set');
      this.loading = false;
    }
  }

  selectBatch(batch: Batch): void {
    localStorage.setItem('selectedBatchId', batch.id);
    this.router.navigate(['/candidate-list']);
  }

  logout(): void {
    this.authService.clearTpEmail();
    this.router.navigate(['/login']);
  }
}
