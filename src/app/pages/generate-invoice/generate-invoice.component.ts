import { AfterViewInit, Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
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

      res === 'download' ? this.openPDF() : false;    //  console.log(res);
      // console.log(res);


    })


    // throw new Error('Method not implemented.');

  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    // console.log(this.box);
    console.log();
    // this.box?.nativeElement.style.background='blue';
  }


  makePDF() {
    const pdf = new jsPDF('p', 'mm', 'letter');
    pdf.html(this.box?.nativeElement, {
      callback: (pdf) => { pdf.save("demo.pdf"); }
    })
  }

  public openPDF(): void {
    // let DATA: any = document.getElementById('box');
    html2canvas(this.box?.nativeElement).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });

  // increasecount(){
  // this.count++;
  // }

}
}
