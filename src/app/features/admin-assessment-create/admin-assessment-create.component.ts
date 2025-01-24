import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';
import { AdminLoginService } from '../../services/admin-login.service';
import { ToastrService } from 'ngx-toastr';
import { AdminNavbarComponent } from '../../shared/components/admin-navbar/admin-navbar.component';
import { CommonModule, NgForOf } from '@angular/common'; // Import NgForOf
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-admin-assessment-create',
  templateUrl: './admin-assessment-create.component.html',
  styleUrls: ['./admin-assessment-create.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, AdminNavbarComponent, CommonModule, NgForOf, HttpClientModule] // Include HttpClientModule here
})
export class AdminAssessmentCreateComponent {
  assessmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminLoginService: AdminLoginService,
    private toastr: ToastrService
  ) {
    this.assessmentForm = this.fb.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      qpName: ['', Validators.required],
      qpCode: ['', Validators.required],
      metadata: ['', Validators.required],
      numberOfQuestions: ['', Validators.required],
      difficulty: this.fb.group({
        easy: ['', Validators.required],
        medium: ['', Validators.required],
        hard: ['', Validators.required]
      }),
      nos: this.fb.array([
        this.fb.group({
          code: ['', Validators.required],
          numberOfQuestions: ['', Validators.required]
        })
      ])
    }, { validators: [this.questionsSumValidator, this.nosSumValidator] });
  }

  get nosControls() {
    return (this.assessmentForm.get('nos') as FormArray).controls;
  }

  addNos() {
    const nosArray = this.assessmentForm.get('nos') as FormArray;
    nosArray.push(this.fb.group({
      code: ['', Validators.required],
      numberOfQuestions: ['', Validators.required]
    }));
  }

  questionsSumValidator(control: AbstractControl) {
    const numberOfQuestions = control.get('numberOfQuestions')?.value;
    const easy = control.get('difficulty.easy')?.value;
    const medium = control.get('difficulty.medium')?.value;
    const hard = control.get('difficulty.hard')?.value;

    if (numberOfQuestions !== (easy + medium + hard)) {
      return { questionsSumMismatch: true };
    }
    return null;
  }

  nosSumValidator(control: AbstractControl) {
    const numberOfQuestions = control.get('numberOfQuestions')?.value;
    const nosArray = control.get('nos') as FormArray;
    const nosSum = nosArray.controls.reduce((sum, nosControl) => sum + nosControl.get('numberOfQuestions')?.value, 0);

    if (numberOfQuestions !== nosSum) {
      return { nosSumMismatch: true };
    }
    return null;
  }

  createAssessment() {
    if (this.assessmentForm.valid) {
      const assessmentData = this.assessmentForm.value;
      this.adminLoginService.createAssessment(assessmentData).subscribe(response => {
        if (response.success) {
          this.toastr.success('Assessment created successfully');
        } else {
          this.toastr.error(response.message || 'Failed to create assessment');
        }
      }, error => {
        this.toastr.error('Failed to create assessment');
      });
    } else {
      this.toastr.error('Please fill in all fields correctly');
    }
  }
}


