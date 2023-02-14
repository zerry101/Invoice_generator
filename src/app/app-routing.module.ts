import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingFormComponent } from 'src/components/billing-form/billing-form.component';
import { HomeDComponent } from './home-d/home-d.component';

const routes: Routes = [
  {
    path:'app-billing-form',
    component: BillingFormComponent
  },
  {
    path:'app-home-d',
    component: HomeDComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
