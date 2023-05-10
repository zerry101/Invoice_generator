/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/pages/data-transfer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PageEvent } from '@angular/material/paginator';
import { DataSearchService } from 'src/app/shared/services/data-search.service';
import { DialogOverviewExampleDialogComponent } from 'src/app/shared/dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';


export interface DialogData {
  animal: string | undefined;
  name: string | undefined;
}

@Component({
  selector: 'igx-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.scss']
})

export class CustomerInvoiceComponent implements OnInit, AfterViewInit, DialogData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  pageSize: number | undefined;
  pageNumber: number | undefined;

  // eslint-disable-next-line @typescript-eslint/ban-types
  ELEMENT_DATA: Array<Object> | undefined = [];
  showMatPaginator = true;
  constructor(public sD:SharedDataService,private _snackBar: MatSnackBar, public dialog: MatDialog, private excelService: ExcelService, private router: Router, public dt: DataTransferService, private dataSearch: DataSearchService) {

  }
  animal: string | undefined = "";
  name: string | undefined = "";


  ngOnInit(): void {
    this.fetchData(0, 10);
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    console.log();
    this.dataSource.paginator = this.paginator;
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data!: any;
  totalElements = 0;
  fetchData(pageNumber: number, pageSize: number): void {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.Data = this.dt.getData(pageNumber, pageSize).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: (res: any) => {
        res.content.map((item: any, index: number) => {
          const dateObj1 = new Date(res.content[index].dateofsupply);
          item.date = `${dateObj1.getDate()}/${dateObj1.getMonth() + 1}/${dateObj1.getFullYear()}`;
        });

        this.ELEMENT_DATA = res.content;
        this.totalElements = res.totalElements;

        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

        console.log(res);


      }

    })
  }





  nextPage(event: PageEvent) {
    const pageNumber: number = event.pageIndex;
    const pageSize: number = event.pageSize;
    this.fetchData(pageNumber, pageSize);
    console.log('this is pagen and pges');

    console.log(pageNumber, pageSize);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSearch.searchData(filterValue).subscribe({
      next: (res) => {
        console.log("this is searched Data");


        this.totalElements = res.length;
        res.map((item: any) => {
          const dateObj1 = new Date(item.dateofsupply);
          item.date = `${dateObj1.getDate()}/${dateObj1.getMonth() + 1}/${dateObj1.getFullYear()}`;
        })
        this.dataSource = new MatTableDataSource(res);
        // this.isHidePageSize=true;
        this.showMatPaginator = false;

        console.log(res);



        console.log(this.dataSource);
      }
    });

  }
  // eslint-disable-next-line @typescript-eslint/ban-types


  displayedColumns: string[] = ['Name', 'Address', 'ContactNo', 'Date_of_supply', 'Place_of_Supply', 'Transportation_Mode', 'Vehicle_Number', 'action'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource!: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edit(elem: any) {
    console.log(elem);
    this.dt.tableInstanceData.next(elem);
    this.router.navigate(['/update-invoice']);
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, event: Event, element: any): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.delete(element);

      }

    })


  }

  openSnackBar() {
    this._snackBar.open('Data has been succesfully deleted ', 'success', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


  delete(element: any) {
    console.log(element);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.dt.deleteData(element.id).subscribe((data) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.fetchData(this.pageNumber!, this.pageSize!)
      this.openSnackBar();


    });
  }



  // eslint-disable-next-line @typescript-eslint/ban-types
  exportTable() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.excelService.exportAsExcelFile(this.ELEMENT_DATA!, 'export-to-excel');
  }

}

// eslint-disable-next-line @typescript-eslint/ban-types

