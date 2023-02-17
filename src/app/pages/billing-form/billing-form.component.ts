import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { from } from 'rxjs';
import { globalConstants } from '../../shared/constants';
import {DateAdapter,MAT_DATE_LOCALE,MAT_DATE_FORMATS} from"@angular/material/core";
// import { DatePipe } from '@angular/common';
// import { formatDate } from '@angular/common';


@Component({
  selector: 'igx-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  providers:[
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ]
})
export class BillingFormComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.todaydate.setDate(this.todaydate.getDate());
    // this.time=new DatePipe('en-US').transform(this.todaydate,'dd-mm-yyyy');
    // console.log(time);


  }

  time: any;



  ngOnInit(): void {
    this.setupForm();
    this.userForm.controls['DateOfSupply'].patchValue(this.todaysDate());
    console.log(this.DateOfSupplycontrol?.value);
    // console.log(this.todaysDate());

  }

  setupForm() {
    this.userForm = this.fb.group({
      Name: [""],
      Address: [""],
      GSTNO: ["", [Validators.required, Validators.pattern(globalConstants.GST_PATTERN)]],
      TransportationMode: [""],
      VehicleNumber: ["", Validators.pattern(globalConstants.VEHICLENO_PATTERN)],
      DateOfSupply: [],
      PlaceOfSupply: [""],
      ShippedTo: [""],
      productData: this.fb.array([this.initItemRows()]),
    })
  }

  // selectedDate=this.datePipe.transform

  initItemRows(): FormGroup {
    return this.fb.group({
      Description: ["", [Validators.required, Validators.maxLength(4)]],
      HSN: ["", [Validators.required, Validators.pattern('[0-9]{4,8}$')]],
      Quantity: ["", [Validators.required]],
      Rate: [null, [Validators.required]]
    })
  }

  get formarr(): FormArray {
    return this.userForm.get('productData') as FormArray;
  }

  addNewRow() {
    this.formarr?.push(this.initItemRows());
  }

  deleteRow(index: number) {
    if ((this.userForm.get('productData') as FormArray).controls.length > 1) {
      this.formarr.removeAt(index);
    }
  }



  getItemRows() {
    return (this.userForm.get('productData') as FormArray).controls;
  }



  totalPrice() {
    return this.productDatacontrol?.controls.reduce((acc: number, data: any) => {
      return acc + data.get('Rate').value;
    }, 0);


  }

  todaysDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return day + '/' + month + '/' + year;

  }

  todaydate = new Date();
  // this.todaydate=this.todaydate.getDate()+1

  // this.currentDate.setValue

  submitForm() {
    console.log(this.userForm.value);
    this.userForm.markAllAsTouched();
    this.userForm.markAsDirty();

  }



  get DateOfSupplycontrol() {
    return this.userForm.get('DateOfSupply');
  }


  get VehicleNumbercontrol(){return this.userForm.controls['VehicleNumber'];}
  get GSTNOcontrol() { return this.userForm.get('GSTNO'); }
  get Namecontrol() { return this.userForm.get('Name'); }
  get Addresscontrol() { return this.userForm.get('Address'); }

  get productDatacontrol() {
    return (this.userForm.get('productData') as FormArray);
  }

  HSNcontrol(i: number) {
    return this.productDatacontrol.controls[i].get('HSN');
  }

  Descriptioncontrol(i: number) {
    return this.productDatacontrol.controls[i].get('Description');

  }

  Quantitycontrol(i: number) {
    return this.productDatacontrol?.controls[i].get('Quantity');
  }

  Ratecontrol(i: number) {
    return this.productDatacontrol?.controls[i].get('Rate');
  }

}



// function data(value: AbstractControl<any, any>, index: number, array: AbstractControl<any, any>[]): void {
//   throw new Error('Function not implemented.');
// }

