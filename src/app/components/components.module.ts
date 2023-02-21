import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
// import { PagesModule } from "../pages/pages.module";


const COMPONENTS = [
  HeaderComponent,
];

@NgModule({
    declarations: [
        COMPONENTS
    ],

    imports: [
        CommonModule,
        RouterModule,
        // PagesModule
    ],
    exports: [
      COMPONENTS
  ]
})
export class ComponentsModule { }
