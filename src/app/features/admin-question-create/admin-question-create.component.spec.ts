import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionCreateComponent } from './admin-question-create.component';

describe('AdminQuestionCreateComponent', () => {
  let component: AdminQuestionCreateComponent;
  let fixture: ComponentFixture<AdminQuestionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQuestionCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
