import { AfterViewInit, Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'igx-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit, AfterViewInit {


  @ViewChild('box', { static: false }) box: ElementRef | undefined;
  count = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(public sD: SharedDataService) { }

  ngOnInit(): void {
    this.sD.exclusive.next(true);
    this.sD.getPrintInvoice().subscribe((res) => {

      res === 'download' ? this.makePDF() : false;    //  console.log(res);
      console.log(res);


    })


    // throw new Error('Method not implemented.');

  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    console.log(this.box);
    console.log();
    // this.box?.nativeElement.style.background='blue';
  }


  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.box?.nativeElement, {
      callback: (pdf) => { pdf.save("demo.pdf"); }
    })
  }

  // increasecount(){
  // this.count++;
  // }

}
