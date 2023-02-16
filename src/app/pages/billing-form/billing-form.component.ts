import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { globalConstants } from '../../shared/constants';

@Component({
  selector: 'igx-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss']
})
export class BillingFormComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.userForm = this.fb.group({
      Name: [""],
      Address: [""],
      GSTNO: ["", [Validators.required, Validators.pattern(globalConstants.GST_PATTERN)]],
      productData: this.fb.array([this.initItemRows()]),
    })
  }

  initItemRows(): FormGroup {
    return this.fb.group({
      Description: ["",[Validators.required,Validators.maxLength(4)]],
      HSN: ["", [Validators.required, Validators.pattern('[0-9]{4,8}$')]],
      Quantity: ["",[Validators.required]],
      Rate: ["",[Validators.required]]
    })
  }

  get formarr(): FormArray {
    return this.userForm.get('productData') as FormArray;
  }

  addNewRow() {
    this.formarr?.push(this.initItemRows());
  }

  deleteRow(index: number) {
    if((this.userForm.get('productData') as FormArray).controls.length>1)
    {
      this.formarr.removeAt(index);
    }
  }

  getItemRows() {
    return (this.userForm.get('productData') as FormArray).controls;
  }

  submitForm() {
    console.log(this.userForm.value);
    this.userForm.markAllAsTouched();
    this.userForm.markAsDirty();
    // this.userForm.mas
  }


  // get HSN(){
  //   return this.userForm.get('HSN');
  // }

  get GSTNOcontrol() { return this.userForm.get('GSTNO'); }
  get Namecontrol() { return this.userForm.get('Name'); }
  get Addresscontrol() { return this.userForm.get('Address'); }

    get productDatacontrol(){
  return (this.userForm.get('productData') as FormArray);
    }

      HSNcontrol(i:number){
      return this.productDatacontrol.controls[i].get('HSN');
    }

     Descriptioncontrol(i:number){
      return  this.productDatacontrol.controls[i].get('Description');

    }

     Quantitycontrol(i:number){
      return this.productDatacontrol?.controls[i].get('Quantity');
    }

     Ratecontrol(i:number){
      return this.productDatacontrol?.controls[i].get('Rate');
    }

}



// function data(value: AbstractControl<any, any>, index: number, array: AbstractControl<any, any>[]): void {
//   throw new Error('Function not implemented.');
// }

