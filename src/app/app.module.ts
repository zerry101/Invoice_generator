import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DialogOverviewExampleDialogComponent } from './shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

// import { GenerateInvoiceComponent } from './componrnts/generate-invoice/generate-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialogComponent,
    // GenerateInvoiceComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
