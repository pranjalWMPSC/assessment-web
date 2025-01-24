import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../../shared/components/admin-navbar/admin-navbar.component';
import * as XLSX from 'xlsx';
import { QuestionService } from '../../services/question.service';
import { AssessmentService } from '../../services/assessment.service';
import { AuthService } from '../../services/auth.service';


interface Question {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: string;
  marks: number;
  nos: string;
  difficulty: string;
  hasError?: boolean;
  errorMessages: string[];
}

interface Assessment {
  _id: string;  // Change id to _id to match assessment list interface
  name: string;
  qpName: string;
}

interface ExcelQuestion {
  'Sr.No.': number;
  QUESTIONS: string;
  'OPTION A': string;
  'OPTION B': string;
  'OPTION C': string;
  'OPTION D': string;
  ANSWER: string;
  Marks: number;
  NOS: string;
  Difficulty: string;
}

@Component({
  selector: 'app-admin-question-create',
  templateUrl: './admin-question-create.component.html',
  styleUrls: ['./admin-question-create.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, FormsModule]
})
export class AdminQuestionCreateComponent implements OnInit {
  assessments: Assessment[] = [];
  selectedAssessment: string | null = null;  // Change type to string
  questions: Question[] = [];
  isUploading = false;
  loading = false;
  errorMessage = '';

  constructor(
    private questionService: QuestionService,
    private assessmentService: AssessmentService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    this.loadAssessments();
    // Assume the token is set during login and stored in local storage
  }

  private loadAssessments() {
    this.loading = true;
    this.assessmentService.getAssessments().subscribe((response: any) => {
      this.loading = false;
      if (response.success && Array.isArray(response.data)) {
        this.assessments = response.data;
      } else {
        console.error('Expected an array of assessments');
        this.errorMessage = 'Invalid assessment data received';
      }
    }, error => {
      this.loading = false;
      console.error('Failed to fetch assessments', error);
      this.errorMessage = 'Failed to load assessments';
    });
  }

  async onFileUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const firstSheet = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json<ExcelQuestion>(workbook.Sheets[firstSheet]);

      // Log the raw Excel data
      console.log('Raw Excel Data:', data);

      // Log file info
      console.log('File Name:', file.name);
      console.log('Sheet Name:', firstSheet);
      console.log('Total Records:', data.length);

      // Log first row as sample
      if (data.length > 0) {
        const firstRow = data[0];
        console.log('Sample Row Structure:', {
          question: firstRow.QUESTIONS,
          optionA: firstRow['OPTION A'],
          optionB: firstRow['OPTION B'],
          optionC: firstRow['OPTION C'],
          optionD: firstRow['OPTION D'],
          answer: firstRow.ANSWER,
          marks: firstRow.Marks,
          nos: firstRow.NOS,
          difficulty: firstRow.Difficulty
        });
      }

      this.validateAndSetQuestions(data.slice(0, 20));
    };

    reader.readAsBinaryString(file);
  }

  validateAndSetQuestions(data: ExcelQuestion[]) {
    // Log validation summary before processing
    console.log('Starting validation for', data.length, 'questions');

    this.questions = data.map(row => {
      const options = [
        row['OPTION A']?.trim() || '',
        row['OPTION B']?.trim() || '',
        row['OPTION C']?.trim() || '',
        row['OPTION D']?.trim() || ''
      ];

      const question: Question = {
        question: row.QUESTIONS?.trim() || '',
        options: options,
        correctAnswer: row.ANSWER?.trim() || '',
        marks: Number(row.Marks) || 0,
        nos: row.NOS?.trim() || '',
        difficulty: row.Difficulty?.trim() || '',
        hasError: false,
        errorMessages: [] // Initialize as empty array
      };

      // Question text validation
      if (!question.question) {
        question.hasError = true;
        question.errorMessages.push('Question text is required');
      }

      // Options validation
      const nonEmptyOptions = question.options.filter(opt => opt.length > 0);
      if (nonEmptyOptions.length < 4) {
        question.hasError = true;
        question.errorMessages.push('All four options are required');
      }

      // Duplicate options check
      const uniqueOptions = new Set(question.options);
      if (uniqueOptions.size !== nonEmptyOptions.length) {
        question.hasError = true;
        question.errorMessages.push('Options must be unique');
      }

      // Correct answer validation
      if (!question.correctAnswer) {
        question.hasError = true;
        question.errorMessages.push('Correct answer is required');
      } else if (!['A', 'B', 'C', 'D'].includes(question.correctAnswer)) {
        question.hasError = true;
        question.errorMessages.push('Correct answer must be one of A, B, C, or D');
      }

      // Marks validation
      if (!question.marks || question.marks <= 0) {
        question.hasError = true;
        question.errorMessages.push('Marks must be a positive number');
      }

      return question;
    });

    // Log validation results
    const invalidQuestions = this.questions.filter(q => q.hasError);
    console.log('Validation Summary:', {
      totalQuestions: this.questions.length,
      validQuestions: this.questions.length - invalidQuestions.length,
      invalidQuestions: invalidQuestions.length,
      errors: invalidQuestions.map(q => ({
        question: q.question.substring(0, 30) + '...',
        errors: q.errorMessages
      }))
    });
  }

  private mapAnswerToOption(answer: string, options: string[]): string {
    const answerMap: { [key: string]: number } = {
      'A': 0,
      'B': 1,
      'C': 2,
      'D': 3
    };
    const index = answerMap[answer];
    return options[index] || '';
  }

  saveQuestions() {
    if (!this.selectedAssessment) return;

    const selectedAssessment = this.assessments.find(a => a._id === this.selectedAssessment);
    if (!selectedAssessment) {
      this.errorMessage = 'Selected assessment not found';
      return;
    }

    const validQuestions = this.questions.filter(q => !q.hasError);
    if (validQuestions.length === 0) {
      this.errorMessage = 'No valid questions to save';
      return;
    }

    const formattedQuestions = validQuestions.map(q => ({
       // Generate a unique ID for each question
      questions: {
        english: q.question,
        hindi: '', // Add translations if available
        marathi: '' // Add translations if available
      },
      options: {
        english: q.options,
        hindi: q.options, // Add translations if available
        marathi: q.options // Add translations if available
      },
      difficulty: q.difficulty,
      marks: q.marks,
      correctAnswer: this.mapAnswerToOption(q.correctAnswer, q.options),
      qp: selectedAssessment.qpName, // Use qp value from selected assessment
      nos: q.nos,
      pc: 'none', // Set pc to 'none'
      createdBy: 'admin', // Set the appropriate createdBy value
      numberOfTimesUsed: 0,
      createdTime: new Date(),
      modifiedTime: new Date(),
      connectedToAssessments: [selectedAssessment._id],
      active: true
    }));

    this.loading = true;
    this.questionService.uploadQuestions(this.selectedAssessment, formattedQuestions)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.questions = [];
            this.errorMessage = '';
            // Show success message
          } else {
            this.errorMessage = response.message || 'Failed to save questions';
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to save questions';
          this.loading = false;
        }
      });
  }
}
