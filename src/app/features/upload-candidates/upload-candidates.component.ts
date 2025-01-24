import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { CandidateService } from '../../services/candidate.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AssessmentService } from '../../services/assessment.service'; // Import the new service

interface Candidate {
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
}

interface Assessment {
  id: string;
  name: string;
}

interface Batch {
  id: string;
  name: string;
}

@Component({
  selector: 'app-upload-candidates',
  templateUrl: './upload-candidates.component.html',
  styleUrls: ['./upload-candidates.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    FormsModule
  ]
})
export class UploadCandidatesComponent implements OnInit {
  uploadForm: FormGroup;
  candidates: Candidate[] = [];
  validCount: number = 0;
  invalidCount: number = 0;
  assessments: Assessment[] = [];
  batches: Batch[] = [];
  selectedAssessment = '';
  batchName = '';
  batchId = '';
  assessmentConfirmed = false;
  batchConfirmed = false;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private toastr: ToastrService,
    private http: HttpClient,
    private assessmentService: AssessmentService // Inject the new service
  ) {
    this.uploadForm = this.fb.group({
      file: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAssessments();
  }

  fetchAssessments() {
    this.assessmentService.getAssessments().subscribe((response: any) => {
      if (response.success && Array.isArray(response.data)) {
        this.assessments = response.data;
      } else {
        console.error('Expected an array but got:', response);
      }
    }, error => {
      console.error('Error fetching assessments:', error);
    });
  }

  onAssessmentSelect() {
    // Logic to handle assessment selection change
  }

  confirmAssessment() {
    if (this.selectedAssessment) {
      this.assessmentConfirmed = true;
    }
  }

  confirmBatch() {
    if (this.batchName && this.batchId) {
      this.batchConfirmed = true;
    } else {
      this.toastr.error('Please enter both batch name and batch ID', 'Error');
    }
  }

  onBatchSelect() {
    // Logic to handle batch selection change
  }

  fetchBatches(assessmentId: string) {
    this.http.get<any>(`http://localhost:8888/.netlify/functions/server/assessments/${assessmentId}/batches`)
      .subscribe((response: any) => {
        if (response.success && Array.isArray(response.data)) {
          this.batches = response.data;
        } else {
          console.error('Expected an array but got:', response);
        }
      }, error => {
        console.error('Error fetching batch details:', error);
      });
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      this.processExcelData(bstr);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  processExcelData(data: string) {
    const wb: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as unknown[][]; // Explicitly type jsonData as an array of arrays
    const headers = jsonData[0];
    this.candidates = jsonData.slice(1).filter(row => row.length > 0).map((row: unknown[]) => {
      const candidate: Candidate = {
        name: row[0] as string,
        email: row[1] as string,
        phone: row[2] as string,
        status: 'Valid'
      };
      if (!candidate.name || !candidate.email || !candidate.phone) {
        candidate['status'] = 'Invalid';
        this.invalidCount++;
      } else {
        this.validCount++;
      }
      return candidate;
    });
  }

  onSubmit() {
    const validCandidates = this.candidates.filter(candidate => candidate['status'] === 'Valid');
    if (validCandidates.length > 0) {
      this.candidateService.uploadCandidates(validCandidates).subscribe(response => {
        this.toastr.success('Candidates uploaded successfully', 'Success');
      }, error => {
        this.toastr.error('Failed to upload candidates', 'Error');
      });
    } else {
      this.toastr.error('No valid candidates to upload', 'Error');
    }
  }
}
