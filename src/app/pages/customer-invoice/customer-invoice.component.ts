import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'igx-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.scss']
})
export class CustomerInvoiceComponent {
  constructor(private router:Router){ }

}
