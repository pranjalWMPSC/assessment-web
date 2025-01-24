import { Component, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * The root component of the Assessment Platform application.
 *
 * This component is decorated with the `@Component` decorator, which specifies
 * that it is a standalone component and lists the modules it imports.
 *
 * @component
 * @standalone
 * @imports [
 *   RouterModule,
 *   MatToolbarModule,
 *   MatIconModule,
 *   MatCardModule,
 *   MatButtonModule,
 *   MatFormFieldModule,
 *   MatInputModule,
 *   FormsModule,
 *   ReactiveFormsModule,
 *   CommonModule
 * ]
 * @selector 'app-root'
 * @templateUrl './app.component.html'
 * @styleUrls ['./app.component.css']
 */
@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root', // Globally available
})

export class AppComponent {
  title = 'Assessment Platform';
}
