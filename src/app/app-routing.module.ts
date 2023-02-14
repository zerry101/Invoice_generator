import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingFormComponent } from 'src/components/billing-form/billing-form.component';

const routes: Routes = [
  {
    path:'app-billing-form',
    component: BillingFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
