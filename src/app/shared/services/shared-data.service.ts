/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { ɵisObservable } from '@angular/core';
// import { ObserversModule } from '@angular/cdk/observers';
// import { FormArray, FormGroup } from '@angular/forms';

// interface FormGroup{
//   Name: [""],
//   Address: [""],
//   GSTNO: [""],
//   TransportationMode: [""],
//   VehicleNumber: [""],
//   DateOfSupply: [""],
//   PlaceOfSupply: [""],
//   ShippedTo: [""],
//   // productData: this.fb.array([this.initItemRows()]),
//   // GrandTotal:[Number]
// }

@Injectable({
  providedIn: 'any'
})
export class SharedDataService {

  // constructor() {

  //  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  formData: Array<Object> = [];
  exclusive = new Subject<boolean>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public invoiceActivity = new BehaviorSubject<any>(undefined);
  public invoiceActivityData = new BehaviorSubject<any>(undefined);

  // eslint-disable-next-line @typescript-eslint/ban-types
  // invoiceOptions={
  // preview:false,
  // print  :false,
  // download:false
  //  }

  //  this.invoiceOptions.preview=true;


// clickPrintInvoice(data:any){
//   // this.invoiceActivity.next('print');
//   // this.invoiceActivity.next(data);
// }

getInvoiceCommand(): Observable < any > {
  return  this.invoiceActivity.asObservable();
}
getInvoiceData(): Observable < any > {
  return  this.invoiceActivityData.asObservable();
}

// clickPreviewInvoice(data:any){
//   this.invoiceActivity.next('preview');
//   this.invoiceActivity.next(data);

// }

// getPreviewInvoice(): Observable < any > {
//   return this.invoiceActivity.asObservable();
// }

// clickDownloadInvoice(data:any)
// {
//   this.invoiceActivity.next('download');
//   this.invoiceActivity.next(data);

// }

// getDownloadInvoice(): Observable < any > {
//   return this.invoiceActivity.asObservable();
// }


}

