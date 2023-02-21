import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingFormComponent } from './billing-form/billing-form.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {

        path: 'billing',
        component: BillingFormComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path:'customer-invoice',
        component: CustomerInvoiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
