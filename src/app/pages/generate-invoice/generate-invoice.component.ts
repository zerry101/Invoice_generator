import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';

import * as jsPdf from 'jspdf';
import 'jspdf-autotable';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// import * from 'html-to-pdfmake';
// import htmlToPdfmake from 'html-to-pdfmake';
// import * as html2pdf from 'html2pdf.js';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'igx-generate-invoice',
  templateUrl: './generate-invoice.component.html',


  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit, AfterViewInit {


  @ViewChild('box', { static: false }) box: ElementRef | undefined;
  count = 0;

  tableData: any;
  constructor(public sD: SharedDataService) { }

  ngOnInit(): void {
    this.sD.exclusive.next(true);
    this.sD.getInvoiceCommand().subscribe((res) => {


      console.log(res);


      // this.tableData=res;
      // console.log(res);

      // console.log(res.productData);
      // this.tableData=res.productData;
      // console.log(this.tableData);

      // res === 'download' ? this.makePDF() : false;    //  console.log(res);
      // res === 'print' ? pdfMake.createPdf(this.docDefination).print() : false;
      // res === 'preview' ? pdfMake.createPdf(this.docDefination).open() : false;

    })

    this.sD.getInvoiceData().subscribe((res) => {
      console.log(res);
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

    const docDefinitio: any = {
      content: [
        {
          table: {
            widths: ['10%', '*', '*', '*', '*', '*', '*'],
            headerRows: 1,
            body: [
              [
                { text: 'SI NO.', style: 'tableHeader' },
                { text: 'Description of Goods', style: 'tableHeader' },
                { text: 'HSN/SAC', style: 'tableHeader' },
                { text: 'Quantity', style: 'tableHeader' },
                { text: 'Rate', style: 'tableHeader' },
                { text: 'Per', style: 'tableHeader' },
                { text: 'Amount', style: 'tableHeader' },
              ],
              ['1', 'Nitro Pouch', '3294', '480 set', '54.00', 'set', '25,920.00'],
              ['1', 'Nitro Pouch', '3294', '480 set', '54.00', 'set', '25,920.00'],
              ['', 'Total', '', '', '', '', '52000'],
            ]
          }
        }
      ],
      styles: {
        tableHeader: {
          bold: true,
          fillColor: '#eeeeee'
        }
      }
    };

    pdfMake.createPdf(docDefinitio).open();
  }

  // public openPDF(): void {
  //   // const DATA: any = document.getElementById('box');
  //   html2canvas(this.box?.nativeElement).then((canvas) => {
  //     const fileWidth = 208;
  //     const fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     const PDF = new jsPDF('p', 'mm', 'a4');
  //     const position = 0;
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('angular-demo.pdf');
  //   });


  // }

  // docDefination: any;

  // docDefination: any = {
  //   header: 'C#Corner PDF Header',
  //   content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
  // };

  // html:any=htmlToPdfmakeht



  // generatePDF() {
  //   new Promise((resolve, reject) => {
  //     // var inclusions = document.getElementById('inclusions');
  //     html2canvas(this.box?.nativeElement.innerHTML).then((canvas) => {
  //       this.box?.nativeElement.appendChild(canvas);
  //       const data_1 = canvas.toDataURL();
  //       resolve(data_1);
  //       console.log(this.box);
  //     });
  //   });



  // }
}
