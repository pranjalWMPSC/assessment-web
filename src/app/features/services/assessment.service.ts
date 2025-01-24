import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  private questions: any[] = [
    { id: 1, question: 'Question 1', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], answer: null },
    { id: 2, question: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], answer: null },
    // Add more questions as needed
  ];

  getQuestions(): any[] {
    return this.questions;
  }

  constructor() { }
}
