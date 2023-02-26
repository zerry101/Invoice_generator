import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalConstants } from '../../shared/constants';
import { MAT_DATE_FORMATS } from "@angular/material/core";
// import { Output, EventEmitter } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';


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

  constructor(private fb: FormBuilder, public sD: SharedDataService) {
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

  submitForm() {
    this.userForm.controls['GrandTotal'].patchValue(this.totalPrice());
    // console.log(this.userForm.value);
    this.userForm.markAllAsTouched();
    this.userForm.markAsDirty();
    this.Data = this.userForm.value;
    this.sD.formData?.push(this.Data);
    // console.log(typeof(this.userForm.value));
    // console.log(typeof(this.sD.formData));

    console.log(this.sD.formData);
  }



  get DateOfSupplycontrol() {
    return this.userForm.get('DateOfSupply');
  }


  get VehicleNumbercontrol() { return this.userForm.controls['VehicleNumber']; }
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

