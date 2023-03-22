import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'igx-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.scss']
})
export class CustomerInvoiceComponent implements OnInit,AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/ban-types
  ELEMENT_DATA: Array<Object> = [];
  constructor(private router: Router, public dt: DataTransferService) {
    // throw new Error('Method not implemented.');

    console.log('this is element data');
  }


  ngOnInit(): void {
    this.fetchData();


  }

  Data!:any;

  fetchData():void{
   this.Data=this.dt.getData().subscribe((dataObj:any)=>{
      console.log(dataObj);
      console.log(typeof(dataObj));
      console.log('email id type');

      console.log(dataObj[0].email_id);

      this.ELEMENT_DATA=dataObj;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      console.log('this is ele data');
      console.log(this.ELEMENT_DATA);


   })
  }



  // eslint-disable-next-line @typescript-eslint/ban-types





  displayedColumns: string[] = ['Name','Address','ContactNo' , 'Date_of_supply','Place_of_Supply','Transportation_Mode','Vehicle_Number'];

  dataSource!:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


   // eslint-disable-next-line @typescript-eslint/ban-types


}

// eslint-disable-next-line @typescript-eslint/ban-types

