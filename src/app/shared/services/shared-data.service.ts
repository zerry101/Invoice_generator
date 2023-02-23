/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
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
  providedIn: 'root'
})
export class SharedDataService {

  // constructor() {

  //  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  formData: Array<Object> = [];
  exclusive = new Subject<boolean>();

  public invoiceActivity = new Subject<any>();

  // eslint-disable-next-line @typescript-eslint/ban-types
  // invoiceOptions={
  // preview:false,
  // print  :false,
  // download:false
  //  }

  //  this.invoiceOptions.preview=true;


clickPrintInvoice(){
  this.invoiceActivity.next('print');
}

getPrintInvoice(): Observable < any > {
  return  this.invoiceActivity.asObservable();
}

clickPreviewInvoice(){
  this.invoiceActivity.next('preview');
}

getPreviewInvoice(): Observable < any > {
  return this.invoiceActivity.asObservable();
}

clickDownloadInvoice()
{
  this.invoiceActivity.next('download');
}

getDownloadInvoice(): Observable < any > {
  return this.invoiceActivity.asObservable();
}


}

