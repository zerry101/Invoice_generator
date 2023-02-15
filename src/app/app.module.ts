import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { BillingFormComponent } from 'src/components/billing-form/billing-form.component';
import{ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


import { HomeDComponent } from './home-d/home-d.component';

import { FormsModule } from '@angular/forms';
import { DialogButtonComponent } from 'src/components/billing-form/dialog-button/dialog-button.component';
// import { DialogButtonComponent } from './dialog-button/dialog-button.component';
import {DialogContentExampleDialog} from 'src/components/billing-form/dialog-button/dialog-button.component'

@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    BillingFormComponent,
    HomeDComponent,
    DialogButtonComponent,
    DialogContentExampleDialog


 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // entryComponents:[MatDialogModule]
})
export class AppModule { }
