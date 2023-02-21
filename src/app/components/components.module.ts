import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { PagesModule } from "../pages/pages.module";
// import {}


const COMPONENTS = [
  HeaderComponent,
  GenerateInvoiceComponent
];

@NgModule({
    declarations: [
        COMPONENTS,
    ],
    exports: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        // GenerateInvoiceComponent,
        RouterModule,
        PagesModule
    ]
})
export class ComponentsModule { }
