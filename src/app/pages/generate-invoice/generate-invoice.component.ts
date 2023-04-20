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
  tabledataarray: any = [];
  totalProductPrice = '';
  constructor(public sD: SharedDataService) { }

  ngOnInit(): void {
    this.sD.exclusive.next(true);
    this.sD.getInvoiceData().subscribe({
      next: (res) => {
        // console.log('i am generate incoice data');
        // console.log(res);
        this.tabledataarray = [];
        this.totalProductPrice = '';
        this.tableData = {};
        this.tableData = res.productData;
        this.totalProductPrice = res.grandtotal.toLocaleString();
        console.log(this.totalProductPrice, typeof (this.totalProductPrice));
        // console.log(this.totalProductPrice.toLocaleString(),typeof());


        console.log('values');


        this.tableData.forEach((data: any, index: any) => {
          console.log(data);
          // data.push(index);
          const valuedata = [index + 1, ...Object.values(data)];
          this.tabledataarray.push(valuedata);


          index++;

          // console.log(Object.values(data));

        })

        console.log(this.tabledataarray);
        console.log(...this.tabledataarray);
        this.makePDF();
        // console.log(tablearray);



      }
    });
    this.sD.getInvoiceCommand().subscribe({
      next: (res) => {
        console.log('i am generate incoice command');

        // res === 'preview' ? this.makePDF() : false;
        console.log(res);

      }
    });



    // throw new Error('Method not implemented.');

  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    // console.log(this.box);
    console.log();

    // this.box?.nativeElement.style.background='blue';
  }


  makePDF() {

    // const docDefinition: any = {
    //   content: [
    //     {
    //       table: {
    //         widths: ['10%', '*', '*', '*', '*', '*', '*'],
    //         headerRows: 1,
    //         body: [
    //           [
    //             { text: 'SI NO.', style: 'tableHeader' },
    //             { text: 'Description of Goods', style: 'tableHeader' },
    //             { text: 'HSN/SAC', style: 'tableHeader' },
    //             { text: 'Quantity', style: 'tableHeader' },
    //             { text: 'Rate', style: 'tableHeader' },
    //             { text: 'Per', style: 'tableHeader' },
    //             { text: 'Amount', style: 'tableHeader' },
    //           ],
    //           ...this.tabledataarray,
    //           ['', 'Total', '', '', '', '', this.totalProductPrice],
    //         ]
    //       }
    //     }
    //   ],
    //   styles: {
    //     tableHeader: {
    //       bold: true,
    //       fillColor: '#eeeeee'
    //     }
    //   }
    // };



    const docDefinition: any = {
      content: [
        {
          absolutePosition: { x: 50, y: 50 },
          text: `Date: ${new Date().toLocaleDateString()}`,
          style: 'dateSection'
        },
        {
          text: 'Company Name',
          style: 'companyHeader'
        },
        {
          text: '123 Fake Street',
          style: 'companyAddress'
        },
        {
          text: 'City, State - 123456',
          style: 'companyAddress'
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            widths: ['50%', '50%'],
            body: [
              [
                { text: 'Buyer Address', style: 'addressHeader' },
                { text: 'Seller Address', style: 'addressHeader' }
              ],
              [{ text: 'John Doe', style: 'addressText' }, { text: 'Jane Doe', style: 'addressText' }],
            ]
          }
        },
        {
          text: 'Company\'s Bank Details',
          style: 'bankHeader'
        },

        {
          margin: [0, 5, 0, 0],
          table: {
            widths: ['50%', '50%'],
            body: [
              [
                { text: 'Bank Name:', style: 'bankText' },
                { text: 'HDFC Bank Ltd', style: 'bankText' }
              ],
              [{ text: 'A/c No.:', style: 'bankText' }, { text: '50200009780751', style: 'bankText' }],
              [{ text: 'Branch & IFS Code:', style: 'bankText' }, { text: 'Karelibaug & HDFC0000147', style: 'bankText' }]
            ]
          }
        },
        {
          margin: [0, 20, 0, 0],
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
              ...this.tabledataarray,
              ['', 'Total', '', '', '', '', this.totalProductPrice],
            ]
          }
        },

        {
          absolutePosition: { x: 480, y: 780 },
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 250,
              h: 60,
              lineWidth: 1,
              lineColor: '#000000',
              color: '#ffffff'
            },
            {
              text: 'Authorized Signatory',
              fontSize: 12,
              alignment: 'center',
              margin: [0, 25, 0, 0]
            },

          ]
        },
        {
          margin: [40, 40, 40, 40],
          table: {
            widths: ['*'],
            body: [
              [{ text: 'Declaration:- We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct', style: 'declarationText' }],
            ]
          }
        },
      ],
      styles: {
        companyHeader: {
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        companyAddress: {
          fontSize: 14,
          alignment: 'center'
        },
        addressHeader: {
          bold: true,
          fontSize: 14,
          fillColor: '#eeeeee',
          alignment: 'center'
        },
        addressText: {
          fontSize: 12
        },

      }
    }

    this.tabledataarray = 0;
    this.totalProductPrice = '';
    pdfMake.createPdf(docDefinition).open();
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
