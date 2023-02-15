import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { BillingFormComponent } from './billing-form/billing-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    BillingFormComponent,
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    ComponentsModule
  ]
})
export class PagesModule { }