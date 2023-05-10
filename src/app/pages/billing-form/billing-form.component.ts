import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalConstants } from '../../shared/constants';
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { DataTransferService } from 'src/app/pages/data-transfer.service';
import { Router } from '@angular/router';


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
export class BillingFormComponent implements OnInit{


  userForm: FormGroup = new FormGroup({});
  exclusive: boolean | undefined = true;

  constructor(private fb: FormBuilder, public sD: SharedDataService, public dt: DataTransferService, public router: Router) {
    this.todaydate.setDate(this.todaydate.getDate());
  }


  ngOnInit(): void {
    this.setupForm();
    this.userForm.controls['dateOfSupply'].patchValue(this.todaysDate());
    console.log(typeof (this.todaysDate()), this.todaysDate());

    this.sD.exclusive.subscribe((res) => {
      this.exclusive = res;
    })

  }

signalVar='';

signalChange(){
  console.log(this.sD.firstname());
  this.sD.firstname.set('zishan');
  console.log(this.sD.firstname());
this.signalVar=this.sD.firstname();
}



  setupForm() {
    this.userForm = this.fb.group({
      name: [""],
      address: [""],
      contactno: ["",[Validators.required, Validators.pattern(globalConstants.CONTACT_NO)]],
      GSTNO: ["", [Validators.required, Validators.pattern(globalConstants.GST_PATTERN)]],
      transportationmode: [""],
      vehiclenumber: ["", Validators.pattern(globalConstants.VEHICLENO_PATTERN)],
      dateofsupply: [],
      placeofsupply: [""],
      shippedto: [""],
      productData: this.fb.array([this.initItemRows()]),
      grandtotal: [Number]
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
    this.sD.invoiceActivity.next('print');
    this.sD.invoiceActivityData.next(this.userForm.value);
    }

  downloadInvoice() {
    this.userForm.controls['grandtotal'].patchValue(this.totalPrice());
    this.sD.invoiceActivity.next('download');
    this.sD.invoiceActivityData.next(this.userForm.value);
   }

  previewInvoice() {
    this.sD.firstname.set('preview');
    this.userForm.controls['grandtotal'].patchValue(this.totalPrice());
    this.sD.invoiceActivityData.next(this.userForm.value);
    this.router.navigate(['generate-invoice'],{replaceUrl:false,skipLocationChange:true});
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



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data: any;

  submitForm() {
    this.userForm.controls['grandtotal'].patchValue(this.totalPrice());

    this.userForm.markAllAsTouched();
    this.userForm.markAsDirty();
    this.Data = this.userForm.value;
    this.sD.formData?.push(this.Data);
    this.Data.productData = JSON.stringify(this.Data.productData);

    this.dt.postData(this.Data).subscribe((data) => {
      console.log(data);
    });
  }




  get dateOfSupplycontrol() {
    return this.userForm.get('dateofsupply');
  }


  get vehicleNumbercontrol() { return this.userForm.controls['vehiclenumber']; }
  get GSTNOcontrol() { return this.userForm.get('GSTNO'); }
  get Namecontrol() { return this.userForm.get('name'); }
  get addresscontrol() { return this.userForm.get('address'); }
  get BankNamecontrol() { return this.userForm.get('BankName'); }
  get AccountNocontrol() { return this.userForm.get('AccountNo'); }
  get BranchandIFSCodecontrol() { return this.userForm.get('BranchandIFSCode'); }
  get contactNocontrol() { return this.userForm.get('contactno'); }
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




