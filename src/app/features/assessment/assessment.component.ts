import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../services/candidate.service';
import { AssessmentService } from '../services/assessment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatRadioModule]
})
export class AssessmentComponent implements OnInit, OnDestroy {
  candidate: any;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  timer: number = 600; // 10 minutes in seconds
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit(): void {
    const candidateId = this.route.snapshot.paramMap.get('id') as string;
    this.candidate = JSON.parse(localStorage.getItem('selectedCandidate') || '{}');
    this.questions = this.assessmentService.getQuestions();
    this.startTimer();
    this.preventBackButton();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.submitAssessment();
      }
    }, 1000);
  }

  get formattedTimer(): string {
    const minutes: number = Math.floor(this.timer / 60);
    const seconds: number = this.timer % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitAssessment(): void {
    clearInterval(this.interval);
    this.completeAssessment();
  }

  completeAssessment(): void {
    this.candidateService.completeAssessment(this.candidate.id).subscribe(() => {
      alert('Assessment completed');
      this.router.navigate(['/candidate-list']);
    });
  }

  preventBackButton(): void {
    history.pushState('', '', location.href);
    window.onpopstate = () => {
      history.pushState('', '', location.href);
      alert('You cannot go back during the assessment.');
    };
  }
}
