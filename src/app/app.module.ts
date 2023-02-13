import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { BillingFormComponent } from 'src/components/billing-form/billing-form.component';
import{ReactiveFormsModule} from '@angular/forms'
@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    BillingFormComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
