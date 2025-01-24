import { Routes } from '@angular/router';
import { UploadCandidatesComponent } from './features/upload-candidates/upload-candidates.component';
import { CandidateListComponent } from './features/candidate-list/candidate-list.component';
import { InstructionsComponent } from './features/instructions/instructions.component';
import { AssessmentComponent } from './features/assessment/assessment.component';
import { BatchListComponent } from './features/batch-list/batch-list.component';
import { AdminLoginComponent } from './features/admin-login/admin-login.component';
import { AdminAssessmentCreateComponent } from './features/admin-assessment-create/admin-assessment-create.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { AdminAssessmentListComponent } from './features/admin-assessment-list/admin-assessment-list.component';
import { AdminQuestionCreateComponent } from './features/admin-question-create/admin-question-create.component';
import { AdminQuestionListComponent } from './features/admin-question-list/admin-question-list.component';
import { AdminTpListComponent } from './features/admin-tp-list/admin-tp-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'upload-candidates', component: UploadCandidatesComponent },
  { path: 'candidate-list', component: CandidateListComponent },
  { path: 'instructions/:id', component: InstructionsComponent },
  { path: 'assessment/:id', component: AssessmentComponent },
  { path: 'batches/:tpEmail', component: BatchListComponent },
  { path: 'candidates/:batchId', component: CandidateListComponent },
  { path: 'batch-list', component: BatchListComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-assessment-create', component: AdminAssessmentCreateComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-assessment-list', component: AdminAssessmentListComponent },
  { path: 'admin-question-create', component: AdminQuestionCreateComponent },
  { path: 'admin-question-list', component: AdminQuestionListComponent },
  { path: 'admin-tp-list', component: AdminTpListComponent }
];
