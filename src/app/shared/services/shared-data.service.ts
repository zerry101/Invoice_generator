import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
   formData:Array<Object>=[];
}

