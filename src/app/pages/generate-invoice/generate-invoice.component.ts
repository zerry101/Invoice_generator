import { AfterViewInit, Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';

// pdfMAke
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// import * from 'html-to-pdfmake';
// import htmlToPdfmake from 'html-to-pdfmake';
// import * as html2pdf from 'html2pdf.js';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'igx-generate-invoice',
  templateUrl: './generate-invoice.component.html',


  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit, AfterViewInit {


  @ViewChild('box', { static: false }) box: ElementRef | undefined;
  count = 0;

  constructor(public sD: SharedDataService) { }

  ngOnInit(): void {
    this.sD.exclusive.next(true);
    this.sD.getPrintInvoice().subscribe((res) => {

      res === 'download' ? this.makePDF() : false;    //  console.log(res);
      // res === 'print' ? pdfMake.createPdf(this.docDefination).print() : false;
      // res === 'preview' ? pdfMake.createPdf(this.docDefination).open() : false;

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
    // const width = this.box?.nativeElement.innerHTML.pageSize.getWidth();
// const height = this.box?.nativeElement.innerHTML.pageSize.getHeight();

// console.log(width,height);

    const pdf = new jsPDF({
      orientation: 'p',
        unit: 'pt',
        format: [1700,1700]
    });
    pdf.html(this.box?.nativeElement, {
      callback: (pdf) => { pdf.save("demo.pdf."); }
    })

    // pdf.createPDF(this.box?.nativeElement).open();
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


  }

  // docDefination: any;

  docDefination: any = {
    header: 'C#Corner PDF Header',
    content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
  };

  // html:any=htmlToPdfmakeht



  generatePDF(){ new Promise((resolve, reject) => {
    // var inclusions = document.getElementById('inclusions');
    html2canvas(this.box?.nativeElement.innerHTML).then((canvas) => {
        this.box?.nativeElement.appendChild(canvas);
        const data_1 = canvas.toDataURL();
        resolve(data_1);
        console.log(this.box);
    });
});



  }
}
