import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { UploadCandidatesComponent } from './upload-candidates.component';

describe('UploadCandidatesComponent', () => {
  let component: UploadCandidatesComponent;
  let fixture: ComponentFixture<UploadCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCandidatesComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
