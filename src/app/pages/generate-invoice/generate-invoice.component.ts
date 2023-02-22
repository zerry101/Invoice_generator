import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

@Component({
  selector: 'igx-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {

  count = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(public sD: SharedDataService) { }
  ngOnInit(): void {
    this.sD.exclusive.next(true);
    this.sD.getPrintInvoice().subscribe((res) => {

      res==='download' ? this.makePDF() : false;    //  console.log(res);
      console.log(res);



    })
    // throw new Error('Method not implemented.');

  }



  makePDF() {
    const pdf = new jsPDF();
    pdf.text('hello', 10, 10);
    pdf.save();
  }

  // increasecount(){
  // this.count++;
  // }

}
