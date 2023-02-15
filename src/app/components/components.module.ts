import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  HeaderComponent
];

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    COMPONENTS
  ]
})
export class ComponentsModule { }
