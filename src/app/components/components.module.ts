import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
// import {}


const COMPONENTS = [
  HeaderComponent,
  GenerateInvoiceComponent
];

@NgModule({
  declarations: [
    COMPONENTS,

  ],
  imports: [
    CommonModule,
    // GenerateInvoiceComponent,

    RouterModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class ComponentsModule { }
