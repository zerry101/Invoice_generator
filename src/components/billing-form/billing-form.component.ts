import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss']
})
export class BillingFormComponent  implements OnInit{

  userForm: FormGroup=new FormGroup('');

  constructor(private fb:FormBuilder){
  }
  ngOnInit(): void {
    this.setupForm();
    // throw new Error('Method not implemented.');
  }

  setupForm(){

    this.userForm=this.fb.group({
      Name:[""],
      Address:[""],
      GSTNO:[""],
      productData:[""]



    })
  }





}
