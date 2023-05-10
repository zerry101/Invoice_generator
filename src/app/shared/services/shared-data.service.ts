/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class SharedDataService {


  // eslint-disable-next-line @typescript-eslint/ban-types
  formData: Array<Object> = [];
  exclusive = new Subject<boolean>();

  firstname=signal<string>('intaial value');


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public invoiceActivity = new BehaviorSubject<any>(undefined);
  public invoiceActivityData = new BehaviorSubject<any>(undefined);


  // eslint-disable-next-line @typescript-eslint/ban-types
getInvoiceCommand(): Observable < any > {
  return  this.invoiceActivity.asObservable();
}
getInvoiceData(): Observable < any > {
  return  this.invoiceActivityData.asObservable();
}



}

