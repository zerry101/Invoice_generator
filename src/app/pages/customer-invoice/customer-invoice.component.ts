import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/shared/services/data-transfer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import * as XLSX from "xlsx";
import { ExcelService } from 'src/app/shared/services/excel.service';
import { async, map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { DataSearchService } from 'src/app/shared/services/data-search.service';


@Component({
  selector: 'igx-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.scss']
})

export class CustomerInvoiceComponent implements OnInit, AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/ban-types
  pageSize: number | undefined;
  pageNumber: number | undefined;

  // eslint-disable-next-line @typescript-eslint/ban-types
  ELEMENT_DATA: Array<Object> | undefined = [];
  showMatPaginator = true;
  constructor(private excelService: ExcelService, private router: Router, public dt: DataTransferService, private dataSearch: DataSearchService) {
  }


  ngOnInit(): void {
    this.fetchData(0, 10);
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    console.log();
    this.dataSource.paginator = this.paginator;
  }


  Data!: any;
  totalElements = 0;
  fetchData(pageNumber: number, pageSize: number): void {
    this.pageSize =pageSize;
    this.pageNumber=pageNumber;
      this.Data = this.dt.getData(pageNumber, pageSize).subscribe({
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

  onFirstLastPageButton(event: any) {
    console.log("hii");


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
        // this
        // console.log(data.lenth);


        this.totalElements = res.length;
        res.map((item: any, index: number) => {
          const dateObj1 = new Date(item.dateofsupply);

          // console.log(item.name);

          item.date = `${dateObj1.getDate()}/${dateObj1.getMonth() + 1}/${dateObj1.getFullYear()}`;
        })
        this.dataSource = new MatTableDataSource(res);
        // this.isHidePageSize=true;
        this.showMatPaginator = false;

        console.log(res);

        // this.dataSource.PageSize=0;
        // this.dataSource.PageOptions=0


        console.log(this.dataSource);
      }
    });




    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // eslint-disable-next-line @typescript-eslint/ban-types


  displayedColumns: string[] = ['Name', 'Address', 'ContactNo', 'Date_of_supply', 'Place_of_Supply', 'Transportation_Mode', 'Vehicle_Number', 'action'];

  dataSource!: any;

  edit(elem: any) {
    // console.log(elem);
    console.log(elem);
    this.dt.tableInstanceData.next(elem);
    this.router.navigate(['/update-invoice']);
  }



  delete(elem: any) {
    console.log(elem);

    this.dt.deleteData(elem.id).subscribe((data)=>{
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.fetchData(this.pageNumber!, this.pageSize!);

    });

  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  exportTable() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.excelService.exportAsExcelFile(this.ELEMENT_DATA!, 'export-to-excel');
  }

}

// eslint-disable-next-line @typescript-eslint/ban-types

