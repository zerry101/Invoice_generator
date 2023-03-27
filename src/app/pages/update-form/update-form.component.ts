import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalConstants } from '../../shared/constants';
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'igx-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
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
export class UpdateFormComponent implements OnInit, OnDestroy {

  userForm: FormGroup = new FormGroup({});
  exclusive: boolean | undefined = true;

  constructor(private fb: FormBuilder, public sD: SharedDataService, public dt: DataTransferService, public router: Router) { }
  ngOnDestroy(): void {
    this.userForm.reset();
  }

  ngOnInit(): void {

    this.setupForm();

    this.dt.tableInstanceData.subscribe((data) => {
      Object.keys(this.userForm.controls).forEach((control) => {
        console.log(control, data[control]);

        this.userForm.controls[control].patchValue(data[control]);
        if (control.localeCompare('productData')) {
          JSON.parse(data.productData).forEach((product: any) => {
            this.initItemRows();
          })
          this.formarr.patchValue(JSON.parse(data.productData));
        }


      })

      console.log(data);
    })


    console.log(typeof (this.todaysDate()), this.todaysDate());

    this.sD.exclusive.subscribe((res) => {
      this.exclusive = res;
    })
  }



  setupForm() {
    this.userForm = this.fb.group({
      name: [""],
      address: [""],
      contactNo: ["", [Validators.required, Validators.pattern(globalConstants.CONTACT_NO)]],
      GSTNO: ["", [Validators.required, Validators.pattern(globalConstants.GST_PATTERN)]],
      transportationMode: [""],
      vehicleNumber: ["", Validators.pattern(globalConstants.VEHICLENO_PATTERN)],
      dateOfSupply: [""],
      placeOfSupply: [""],
      shippedTo: [""],

      productData: this.fb.array([this.initItemRows()]),
      grandTotal: [Number]
    })
  }


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


  onEnter(value: string) {
    const numberOfRowsToInsert = parseInt(value, 10) - 1;

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


  Data: any;

  submitForm() {
    this.userForm.controls['grandTotal'].patchValue(this.totalPrice());
    this.userForm.markAllAsTouched();
    this.userForm.markAsDirty();

    this.Data = this.userForm.value;
    console.log(" haha data");
    console.log(this.Data);
    console.log(this.Data.dateOfSupply.toDateString());

    this.Data.dateOfSupply = `${this.Data.dateOfSupply.getDate() + '/' + (this.Data.dateOfSupply.getMonth() + 1) + '/' + this.Data.dateOfSupply.getFullYear()}`;

    this.sD.formData?.push(this.Data);
    this.Data.productData = JSON.stringify(this.Data.productData);
    console.log("data ");
  }




  get dateOfSupplycontrol() {
    return this.userForm.get('dateOfSupply');
  }

  get vehicleNumbercontrol() { return this.userForm.controls['vehicleNumber']; }
  get GSTNOcontrol() { return this.userForm.get('GSTNO'); }
  get Namecontrol() { return this.userForm.get('Name'); }
  get addresscontrol() { return this.userForm.get('address'); }
  get BankNamecontrol() { return this.userForm.get('BankName'); }
  get AccountNocontrol() { return this.userForm.get('AccountNo'); }
  get BranchandIFSCodecontrol() { return this.userForm.get('BranchandIFSCode'); }
  get contactNocontrol() { return this.userForm.get('contactNo'); }
  get LandlineNocontrol() { return this.userForm.get('LandlineNo'); }


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

  transportationModecontrol() {
    return this.productDatacontrol.get('transportationMode');
  }

  Amountcontrol(i: number) {
    return this.productDatacontrol?.controls[i].get('Amount');
  }

}
