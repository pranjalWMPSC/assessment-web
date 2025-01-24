import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CandidateListComponent } from './candidate-list.component';
import { CandidateService } from '../services/candidate.service';
import { Router } from '@angular/router';

describe('CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  let candidateServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    candidateServiceMock = {
      getCandidates: jasmine.createSpy('getCandidates').and.returnValue(of({
        success: true,
        count: 2,
        data: [
          {
            _id: '1',
            firstName: 'John',
            lastName: 'Doe',
            tpEmail: 'john@example.com',
            mobileNumber: '1234567890',
            examination: { status: 'Pending' }
          },
          {
            _id: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            tpEmail: 'jane@example.com',
            mobileNumber: '0987654321',
            examination: { status: 'Passed' }
          }
        ]
      }))
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [CandidateListComponent],
      providers: [
        { provide: CandidateService, useValue: candidateServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load candidates on init', () => {
    expect(component.candidates.length).toBe(2);
    expect(component.candidates[0].name).toBe('John Doe');
    expect(component.candidates[1].assessmentCompleted).toBe(true);
  });

  it('should navigate to instructions if assessment not completed', () => {
    const candidate = component.candidates[0];
    component.startAssessment(candidate);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/instructions', candidate.id]);
  });

  it('should alert if assessment already completed', () => {
    spyOn(window, 'alert');
    const candidate = component.candidates[1];
    component.startAssessment(candidate);
    expect(window.alert).toHaveBeenCalledWith('Assessment already completed');
  });
});
