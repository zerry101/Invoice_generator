import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
// import { GenerateInvoiceComponent } from './componrnts/generate-invoice/generate-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    // GenerateInvoiceComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
