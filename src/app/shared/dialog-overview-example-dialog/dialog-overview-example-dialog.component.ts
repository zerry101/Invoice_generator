import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/pages/customer-invoice/customer-invoice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'igx-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>) { }

  dataYouWantToReturn = false;



  onOk() {
    this.dialogRef.close({ data: !this.dataYouWantToReturn });
  }

}
