import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AdminAssessmentListComponent } from './admin-assessment-list.component';
import { AssessmentService } from '../../services/assessment.service';

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

describe('AdminAssessmentListComponent', () => {
  let component: AdminAssessmentListComponent;
  let fixture: ComponentFixture<AdminAssessmentListComponent>;
  let assessmentService: AssessmentService;
  const mockAssessments: Assessment[] = [
    {
      name: 'Assessment 1',
      time: '60',
      date: '2023-12-01T00:00:00.000Z',
      qpName: 'QP1',
      qpCode: 'QP001',
      metadata: 'Sample metadata',
      numberOfQuestions: 30,
      difficulty: { easy: 10, medium: 10, hard: 10 },
      nos: [{ code: 'NOS1', numberOfQuestions: 15 }, { code: 'NOS2', numberOfQuestions: 15 }],
      createdAt: '2025-01-23T10:11:09.598Z',
      updatedAt: '2025-01-23T10:11:09.598Z',
      subject: 'Mathematics',
      _id: '6789235fded08215a0d70312'
    },
    {
      name: 'Assessment 2',
      time: '90',
      date: '2025-01-23T00:00:00.000Z',
      qpName: 'QP2',
      qpCode: 'QP002',
      metadata: 'Kbl test',
      numberOfQuestions: 10,
      difficulty: { easy: 5, medium: 4, hard: 1 },
      nos: [
        { code: 'NOS/0001', numberOfQuestions: 4 },
        { code: 'NOS/0002', numberOfQuestions: 3 },
        { code: 'NOS/0003', numberOfQuestions: 3 }
      ],
      createdAt: '2025-01-23T07:43:25.195Z',
      updatedAt: '2025-01-23T07:43:25.197Z',
      subject: 'Test - Assessment KBL',
      _id: '6791f31d59706286bfd7295a'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AdminAssessmentListComponent],
      providers: [AssessmentService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssessmentListComponent);
    component = fixture.componentInstance;
    assessmentService = TestBed.inject(AssessmentService);

    spyOn(assessmentService, 'getAssessments').and.returnValue(of(mockAssessments));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch assessments on init', () => {
    expect(component.assessments).toEqual(mockAssessments);
  });

  it('should select an assessment', () => {
    const assessment = mockAssessments[0];
    component.selectAssessment(assessment);
    expect(component.selectedAssessment).toBe(assessment);
  });

  it('should deselect an assessment if clicked again', () => {
    const assessment = mockAssessments[0];
    component.selectAssessment(assessment);
    component.selectAssessment(assessment);
    expect(component.selectedAssessment).toBeNull();
  });

  it('should navigate to add question page', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    const assessment = mockAssessments[0];
    component.selectAssessment(assessment);
    component.addQuestion();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin-question-create', assessment._id]);
  });
});
