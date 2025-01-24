import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
