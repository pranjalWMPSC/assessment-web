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
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule), pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
  { path: 'upload-candidates', component: UploadCandidatesComponent, pathMatch: 'full' },
  { path: 'candidate-list', component: CandidateListComponent, pathMatch: 'full' },
  { path: 'instructions', component: InstructionsComponent, data: { renderMode: 'ssr' }, pathMatch: 'full' },
  { path: 'assessment', component: AssessmentComponent, pathMatch: 'full' },
  { path: 'batches', component: BatchListComponent, data: { renderMode: 'ssr' }, pathMatch: 'full' },
  { path: 'candidates', component: CandidateListComponent, data: { renderMode: 'ssr' }, pathMatch: 'full' },
  { path: 'batch-list', component: BatchListComponent, pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent, pathMatch: 'full' },
  { path: 'admin-assessment-create', component: AdminAssessmentCreateComponent, pathMatch: 'full' },
  { path: 'admin-dashboard', component: AdminDashboardComponent, pathMatch: 'full' },
  { path: 'admin-assessment-list', component: AdminAssessmentListComponent, pathMatch: 'full' },
  { path: 'admin-question-create', component: AdminQuestionCreateComponent, pathMatch: 'full' },
  { path: 'admin-question-list', component: AdminQuestionListComponent, pathMatch: 'full' },
  { path: 'admin-tp-list', component: AdminTpListComponent, pathMatch: 'full' }
];
