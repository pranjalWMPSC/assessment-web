import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssessmentCreateComponent } from './admin-assessment-create.component';

describe('AdminAssessmentCreateComponent', () => {
  let component: AdminAssessmentCreateComponent;
  let fixture: ComponentFixture<AdminAssessmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAssessmentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssessmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
