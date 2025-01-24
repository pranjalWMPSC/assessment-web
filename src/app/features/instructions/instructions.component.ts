import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../services/candidate.service';
import { AssessmentService } from '../services/assessment.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  candidate: any;
  questions: any[] = [];
  timer: number = 600; // 10 minutes

  constructor(private route: ActivatedRoute, private router: Router, private candidateService: CandidateService, private assessmentService: AssessmentService) {}

  ngOnInit(): void {
    const candidateId = this.route.snapshot.paramMap.get('id') as string;
    this.candidate = JSON.parse(localStorage.getItem('selectedCandidate') || '{}');
    this.questions = this.assessmentService.getQuestions();
  }

  startAssessment(): void {
    this.router.navigate(['/assessment', this.candidate.id]);
  }
}
