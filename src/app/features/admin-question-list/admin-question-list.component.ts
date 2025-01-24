import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../shared/components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-question-list',
  templateUrl: './admin-question-list.component.html',
  styleUrls: ['./admin-question-list.component.css'],
  standalone: true,
  imports: [AdminNavbarComponent]
})
export class AdminQuestionListComponent {

}
