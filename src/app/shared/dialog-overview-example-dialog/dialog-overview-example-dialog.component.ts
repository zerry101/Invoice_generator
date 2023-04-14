import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/customer-invoice/customer-invoice.component';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'igx-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>) {}

}
