import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalConstants } from '../../shared/constants';
import { MAT_DATE_FORMATS } from "@angular/material/core";
// import { Output, EventEmitter } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';

interface employee {
  firstname: string,
  lastname: string,
  emailid: string

}

@Component({
  selector: 'igx-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  providers: [
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

  // @Output() newItemEvent= new EventEmitter<FormGroup>();

  userForm: FormGroup = new FormGroup({});
  exclusive: boolean | undefined = true;

  constructor(private fb: FormBuilder, public sD: SharedDataService, public dt: DataTransferService) {
    this.todaydate.setDate(this.todaydate.getDate());


  }




  ngOnInit(): void {
    this.setupForm();
    this.userForm.controls['DateOfSupply'].patchValue(this.todaysDate());
    console.log(typeof (this.todaysDate()), this.todaysDate());

    this.sD.exclusive.subscribe((res) => {
      this.exclusive = res;
    })

    // console.log(this.DateOfSupplycontrol?.value);
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
      // BanKName:[""],
      // AccountNo:[""],
      // BranchandIFSCode:[""],
      productData: this.fb.array([this.initItemRows()]),
      GrandTotal: [Number]
    })
  }

  // selectedDate=this.datePipe.transform

  initItemRows(): FormGroup {
    return this.fb.group({
      Description: ["", [Validators.required, Validators.maxLength(4)]],
      HSN: ["", [Validators.required, Validators.pattern('[0-9]{4,8}$')]],
      Quantity: ["", [Validators.required]],
      Rate: ["", [Validators.required]],
      Per: ["", [Validators.required]],
      Amount: [null, [Validators.required]]
    })
  }

  get formarr(): FormArray {
    return this.userForm.get('productData') as FormArray;
  }

  printInvoice() {
    this.sD.clickPrintInvoice();
  }

  downloadInvoice() {
    this.sD.clickDownloadInvoice();
  }

  previewInvoice() {
    this.sD.clickPreviewInvoice();
  }

  addNewRow() {
    this.formarr?.push(this.initItemRows());
  }

  deleteRow(index: number) {
    if ((this.userForm.get('productData') as FormArray).controls.length > 1) {
      this.formarr.removeAt(index);
    }
  }

  // deleteAllRows() {
  //   this.formarr.controls.splice(1, this.formarr.controls.length);
  // }

  onEnter(value: string) {
    const numberOfRowsToInsert = parseInt(value, 10) - 1;

    // console.log();
    for (let i = 0; i < numberOfRowsToInsert; i++) {
      this.formarr?.push(this.initItemRows());
    }

    return
  }


  getItemRows() {
    return (this.userForm.get('productData') as FormArray).controls;
  }



  totalPrice() {



    return this.productDatacontrol?.controls.reduce((acc: number, data: any) => {
      return acc + data.get('Amount').value;
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

  Data: any;
  // Employee:employee={
  //   firstname: '',
  //   lastname: '',
  //   emailid: ''
  // };

  submitForm() {
    this.userForm.controls['GrandTotal'].patchValue(this.totalPrice());
    // console.log(this.userForm.value);
    this.userForm.markAllAsTouched();
    this.userForm.markAsDirty();
    this.Data = this.userForm.value;
    this.sD.formData?.push(this.Data);
    this.Data.productData=JSON.stringify(this.Data.productData);
    console.log("this is data  "+typeof(this.Data.productData));


    // console.log(typeof(this.userForm.value));
    // console.log(this.userForm);
    console.log(typeof (JSON.stringify(this.Data.productData)));
    console.log(JSON.stringify(this.Data.productData));
    console.log(JSON.parse(JSON.stringify(this.Data.productData)));

    console.log(this.fb.group({ Description: 'first item', HSN: 3304, Quantity: '1 doz', Rate: 34, Per: 'doz' }));


    const far = [{ "Description": "first", "HSN": "", "Quantity": "", "Rate": "", "Per": "", "Amount": null }, { "Description": "second", "HSN": "", "Quantity": "", "Rate": "", "Per": "", "Amount": null }, { "Description": "third", "HSN": "", "Quantity": "", "Rate": "", "Per": "", "Amount": null }, { "Description": "fourth", "HSN": "", "Quantity": "", "Rate": "", "Per": "", "Amount": null }];


    const formaary = far.map(data => this.fb.group(data));

    console.log(formaary);


    // for (let i = 0; i < formaary.length; i++) {
    //   if(i==0){

    //   }
    //   this.formarr.push(formaary[i]);
    // }

    this.formarr.removeAt(0);
    formaary.forEach((data)=>{
      this.formarr.push(data);
    })
    // this.formarr.patchValue(formaary);



    // console.log("this is updated" + this.formarr.value);




    // this.productDatacontrol.patchValue()


    // console.log(typeof(this.sD.formData));
    //  this.Employee.firstname=this.Data.Name;
    //  this.Employee.lastname=this.Data.Address;
    //  this.Employee.emailid=this.Data.PlaceOfSupply;

    //  console.log(typeof(this.Data.DateOfSupply));


     this.dt.postData(this.Data).subscribe((data)=>{
      console.log("Employee posted"+data);

     })


    // console.log(this.Employee);
  }



  // sampleData:  = new FormArray([{ "Description": "first item", "HSN": 3304, "Quantity": "1 doz", "Rate": 34, "Per": "doz", "Amount": 32 }, { "Description": "second item", "HSN": 3209, "Quantity": "2 doz", "Rate": 43, "Per": "56", "Amount": 56 }]);

  get DateOfSupplycontrol() {
    return this.userForm.get('DateOfSupply');
  }


  get VehicleNumbercontrol() { return this.userForm.controls['VehicleNumber']; }
  get GSTNOcontrol() { return this.userForm.get('GSTNO'); }
  get Namecontrol() { return this.userForm.get('Name'); }
  get Addresscontrol() { return this.userForm.get('Address'); }
  get BankNamecontrol() { return this.userForm.get('BankName'); }
  get AccountNocontrol() { return this.userForm.get('AccountNo'); }
  get BranchandIFSCodecontrol() { return this.userForm.get('BranchandIFSCode'); }


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

  Percontrol(i: number) {
    return this.productDatacontrol?.controls[i].get('Per');
  }

  TransportationModecontrol() {
    return this.productDatacontrol.get('TransportationMode');
  }

  Amountcontrol(i: number) {
    return this.productDatacontrol?.controls[i].get('Amount');
  }

}



// function data(value: AbstractControl<any, any>, index: number, array: AbstractControl<any, any>[]): void {
//   throw new Error('Function not implemented.');
// }

